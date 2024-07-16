const { StatusCodes } = require("http-status-codes");
const Image = require("../../models/Picture");
const getPagination = require("../../utils/getPagination");

/**
 *@param {import('express').Request} req - The request object from Express.
 * @param {import('express').Response} res
 */
const queryData = async (req, res) => {
  try {
    const { page = 0, size = 15, query } = req.query;
    const { limit, offset } = getPagination(page, size);

    const pipeline = [
      {
        $search: {
          index: "filtermemory",
          text: {
            query: `${query}`,
            path: {
              wildcard: "*",
            },

            fuzzy: {},
          },
        },
      },
      //   {
      //     $addFields: {
      //       score: { $meta: "searchScore" },
      //     },
      //   },
      //   {
      //     $sort: {
      //       score: { $meta: "searchScore" },
      //     },
      //   },
      {
        $skip: offset,
      },
      {
        $limit: limit,
      },
    ];
    console.time("queryTIme");
    const images = await Image.aggregate(pipeline).exec();
    console.timeEnd("queryTIme");
    if (images.length === 0 || !images) {
      return res.status(404).json({
        success: false,
        message: "Your query did not find any memory",
      });
    }

    return res.status(StatusCodes.OK).json({
      totalImages: images.totalDocs,
      posts: images,
      totalPages: images.totalPages,
      currentPage: images.page - 1,
    });
  } catch (error) {}
};

module.exports = { queryData };
