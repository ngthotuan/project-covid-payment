const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `./uploads`;
        fs.mkdirSync(path, { recursive: true });
        return cb(null, path);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

module.exports = multer({ storage: storage });
