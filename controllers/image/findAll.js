const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../../middlewares/error");
const Image = require("../../models/Picture");
const getPagination = require("../../utils/getPagination");
const { categories } = require("../../utils/categories");

async function findAll(req, res, next) {
  const { page = 0, size = 200, category } = req.query;
  console.log(req.query);
  const query = category;
  const pattern = query
    ? query
        .split("")
        .map((char) => `[${char}${char.toUpperCase()}]`)
        .join(".*?")
    : "";
  try {
    const { limit, offset } = getPagination(page, size);
    const condition = query
      ? {
          $or: [
            { category: { $regex: new RegExp(pattern, "i") } },
            { description: { $regex: new RegExp(pattern, "i") } },
          ],
        }
      : {};

    const images = await Image.paginate(condition, { limit, offset });
    console.log(images.totalDocs);
    if (images?.totalDocs === 0 || !images) {
      console.log("no Image found with this category: ", category);
      return res.status(404).json({
        success: false,
        message: "Your query did not find any memory",
      });
    }
    // console.log(images);
    return res.status(StatusCodes.OK).json({
      totalImages: images.totalDocs,
      posts: images.docs,
      totalPages: images.totalPages,
      currentPage: images.page - 1,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
module.exports = findAll;
