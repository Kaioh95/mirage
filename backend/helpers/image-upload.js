const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb){
        let folder = "";

        //console.log(req);

        if(req.baseUrl.includes('users')){
            folder = "users";
        } else if (req.baseUrl.includes("post")){
            folder = "posts";
        }
        cb(null, path.join(__dirname, `../public/images/${folder}`));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
        //cb(null, Date.now() + path.extname(file.originalname));
    },
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg|gif)$/)) {
            return cb(new Error("Please send only png, jpg or gif!"));
        }
        cb(undefined, true);
    },
});

module.exports = { imageUpload };