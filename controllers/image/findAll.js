const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../../middlewares/error");
const Image = require("../../models/Picture");
const getPagination = require("../../utils/getPagination");

async function findAll(req, res, next) {
  const { page = 0, size = 200, category } = req.query;
  console.log(req.query);
  try {
    const { limit, offset } = getPagination(page, size);

    const condition = category
      ? { category: { $regex: new RegExp(category), $options: "i" } }
      : {};
    console.log(condition);
    const newImage = Image;
    newImage
      .paginate(condition, { limit, offset })
      .then((data) => {
        // console.log(first);
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
