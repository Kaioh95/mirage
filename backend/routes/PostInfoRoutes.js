const router = require("express").Router();

const PostInfoController = require('../controllers/PostInfoController');

const verifyToken = require("../helpers/check-token");

router.post(
    "/create/:id", 
    verifyToken,
    PostInfoController.create
);
router.get("/views-likes/:id", PostInfoController.countPostViewsLikes)
router.get("/views-likes-user/:id", PostInfoController.countUserViewLikes)
router.patch(
    "/edit/:id",
    verifyToken,   
    PostInfoController.editLike)
router.delete("/delete/:id", PostInfoController.deleteInfo)

module.exports = router;