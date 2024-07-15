const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const ResponseError = require("../middlewares/error");
const mongoosePaginate = require("mongoose-paginate-v2");

const ImageSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
      index: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },

    url: {
      type: String,
    },
    base64Image: {
      type: String,
    },
    category: {
      enum: [
        "engineering",
        "software",
        "agriculture",
        "medicine",
        "mathematics",
        "social",
        "science",
        "general",
      ],
      index: true,
      type: String,
    },
  },
  { timestamps: true }
);

ImageSchema.plugin(mongoosePaginate);

const Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
