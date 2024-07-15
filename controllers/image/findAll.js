const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../../middlewares/error");
const Image = require("../../models/Picture");
const getPagination = require("../../utils/getPagination");
const { categories } = require("../../utils/categories");

async function findAll(req, res, next) {
  const { page = 0, size = 200, category } = req.query;

  try {
    const { limit, offset } = getPagination(page, size);
    const condition = category
      ? {
          category: {
            $regex: new RegExp(
              category
                .split("")
                .map((char) => `[${char}${char.toUpperCase()}]`)
                .join(".*?")
            ),
            $options: "i",
          },
        }
      : {};

    const newImage = Image;
    newImage
      .paginate(condition, { limit, offset })
      .then((data) => {
        return res.status(StatusCodes.OK).json({
          totalImages: data.totalDocs,
          posts: data.docs,
          totalPages: data.totalPages,
          currentPage: data.page - 1,
        });
      })
      .catch((err) => {
        res.status(500).json({ success: false, message: err.message });
      });
  } catch (error) {
    return next(new ResponseError(error.message, 500));
  }
}
module.exports = findAll;
