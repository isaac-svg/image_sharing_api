const { Mongoose } = require("mongoose");
const Image = require("../../models/Picture");
const { StatusCodes } = require("http-status-codes");
const likeImage = async (req, res, next) => {
  const { imageId, imageAuthorId, voterId } = req.body;
  // console.log(req.body, "req.body");
  try {
    const image = await Image.findOne({
      _id: imageId,
      authorId: imageAuthorId,
    });
    // console.log(image, "image");
    if (!image) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Please make sure you are not the author of this image",
      });
    }
    console.log(image.likes);
    console.log(imageAuthorId);
    const isAlreadyLiked = image.likes.some(
      (likeId) => likeId.toString() === voterId
    );
    console.log(isAlreadyLiked);
    if (isAlreadyLiked) {
      image.likes = image.likes.filter((voter) => voter.toString() !== voterId);
      // console.log("Unlike");
    } else {
      image.likes.push(voterId);
      // console.log("New liker");
    }
    await image.save();
    // console.log(image);
    return res.status(200).json({ ...image._doc });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = likeImage;
