const multer = require('koa-multer');

//Setup 
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') 
    },
    filename: function (req, file, cb) {
        let fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

var maxSize = 100 * 1024;

let upload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb) {

        if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'), false);
        }
        cb(null, true);
    }
})

module.exports = upload;
