const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../../middlewares/error");
const Image = require("../../models/Picture");

async function deleteImage(req, res, next) {
  const { imageId } = req.body;

  try {
    const payload = await Image.findByIdAndDelete(imageId);
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Image deletion success" });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Image deletion failed" });
  }
}

module.exports = deleteImage;
