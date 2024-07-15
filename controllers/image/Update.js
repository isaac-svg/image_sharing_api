const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../../middlewares/error");
const Image = require("../../models/Picture");
const uploadImage = require("../../utils/uploadToCloud");

async function update(req, res, next) {
  const { imageId, category, description, url, base64Image } = req.body;
  console.log(req.body);
  try {
    if (!description || !description.trim().length > 6) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please provide a description of no less than 6 characters",
      });
    }

    const image = await Image.findById(imageId);
    console.log(image);
    if (!image) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Please specify the image you are deleting",
      });
    }
    if (url) {
      image.url = url;
    }
    if (base64Image) {
      image.base64Image = base64Image;
    }
    if (category) {
      image.category = category;
    }
    console.log("I am here");
    image.description = description;
    category && (image.category = category);

    const newImage = await image.save();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Image updated successfully",
      newImage,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = update;
