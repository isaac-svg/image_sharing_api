const router = require("express").Router();
const findAll = require("../controllers/image/findAll");
const { queryData } = require("../controllers/image/Querydata");

router.route("/all").get(findAll);
router.route("/query").get(queryData);

module.exports = router;
