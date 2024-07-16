const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../../middlewares/error");
const Image = require("../../models/Picture");
const getPagination = require("../../utils/getPagination");
const { categories } = require("../../utils/categories");

async function findAll(req, res, next) {
  console.log(req.query);
  // const pipeline = [
  //   {
  //     $search: {
  //       index: "filtermemory",
  //       text: {
  //         query: `{"description":{$eq: ${category ?? ""}}}`,
  //         path: {
  //           wildcard: "*",
  //         },

  //         fuzzy: {},
  //       },
  //     },
  //   },
  //   {
  //     $limit: 5,
  //   },
  // ];

  try {
    const { page = 0, size = 15, category } = req.query;
    const { limit, offset } = getPagination(page, size);
    console.log({ limit, offset });

    const images = await Image.aggregate([
      {
        $search: {
          index: "filtermemory",
          text: {
            query: `{"description":{$eq: ${category ?? ""}}}`,
            path: {
              wildcard: "*",
            },

            fuzzy: {},
          },
        },
      },
      {
        $addFields: {
          score: { $meta: "searchScore" },
        },
      },
      {
        $sort: {
          score: -1,
        },
      },
      {
        $skip: offset,
      },
      {
        $limit: 10,
      },
    ]).exec();
    // console.log(images);
    if (images.length === 0 || !images) {
      // console.log("no Image found with this category: ", category);
      return res.status(404).json({
        success: false,
        message: "Your query did not find any memory",
      });
    }
    // console.log(images);
    return res.status(StatusCodes.OK).json({
      totalImages: images.totalDocs,
      posts: images,
      totalPages: images.totalPages,
      currentPage: images.page - 1,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
module.exports = findAll;
