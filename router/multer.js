const multer = require("multer");
const path = require("path");
const imgPath = path.join(process.cwd(), "/public/images");
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, imgPath);
    },
    filename(req, file, cb) {
        console.log(file)
        const extname = path.extname(file.originalname);
        const filename = Date.now() + extname;
        req.filePath = "http://127.0.0.1:8886/public/images/" + filename;
        cb(null, filename)
    }
});

module.exports = upload = multer({
    storage
});