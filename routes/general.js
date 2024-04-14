
const router =  require("express").Router()
const findAll = require("../controllers/image/findAll")




router.route("/all").get(findAll)





module.exports = router
