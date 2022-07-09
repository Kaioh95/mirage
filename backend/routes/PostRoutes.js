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
router.get("/last-posts", PostController.getLastFiftyPosts)
router.get("/post/:id", PostController.getPostById)
router.get("/all", PostController.getAllPosts)
router.patch(
    "/edit/:id",
    verifyToken,
    imageUpload.single("image"),    
    PostController.editPost)
router.delete("/delete/:id", verifyToken, PostController.deletePost)

module.exports = router;