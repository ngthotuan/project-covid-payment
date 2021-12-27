const multer = require('multer');
const fs = require('fs');
const { ProductConstant } = require('../constants');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        fs.mkdirSync(ProductConstant.PRODUCT_IMAGE_PATH, { recursive: true });
        return cb(null, ProductConstant.PRODUCT_IMAGE_PATH);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

module.exports = multer({ storage: storage });
