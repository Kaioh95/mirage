const router = require("express").Router();

const PostController = require('../controllers/PostController');

const verifyToken = require("../helpers/check-token");
const { imageUpload } = require("../helpers/image-upload");

router.post(
    "/create", 
    verifyToken,
    imageUpload.single("image"),
    PostController.create
);

module.exports = router;