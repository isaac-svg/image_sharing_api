const createPost = require("../controllers/image/Create");
const deleteImage = require("../controllers/image/Delete");
const likeImage = require("../controllers/image/LikeandUnlike");
const update = require("../controllers/image/Update");
const isAuthor = require("../middlewares/validation/isAuthor");
const isNonAuthor = require("../middlewares/validation/isNonAuthor");
const verifyToken = require("../middlewares/validation/verifyToken");

const router = require("express").Router();

router.route("/create").post([verifyToken], createPost);
router.route("/delete").delete([verifyToken, isAuthor], deleteImage);
router.route("/update/:authorId").patch([verifyToken, isAuthor], update);
router.route("/vote").patch([verifyToken, isNonAuthor], likeImage);
module.exports = router;
