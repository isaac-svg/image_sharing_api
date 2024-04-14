const { StatusCodes } = require("http-status-codes");
const ResponseError = require("../../middlewares/error");
const Image = require("../../models/Picture");
const uploadImage = require("../../utils/uploadToCloud");

async function createPost(req, res, next) {
  console.log(req.body);
  const { url, base64Image, category, description } = req.body;
  console.log(req.file, " file");
  //   console.log(req.body, "upload req.body  \n");
  if (!url && !base64Image) {
    return res.status(StatusCodes.LENGTH_REQUIRED).json({
      message: "Image or url required",
    });
  }
  if (!category) {
    return res.status(StatusCodes.LENGTH_REQUIRED).json({
      message: "Please specify category",
    });
  }

  try {
    // console.log(typeof image);
    // const url = await  uploadImage(image);
    const newImage = await Image.create({
      authorId: req.user.id,
      url: url,
      base64Image: base64Image,
      category,
      description,
    });
    res.json(newImage._doc);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
    });
  }
}

module.exports = createPost;
