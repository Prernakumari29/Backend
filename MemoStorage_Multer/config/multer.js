const multer = require("multer")

const storage = multer.memoryStorage()

const update = multer({storage})
module.exports = update;