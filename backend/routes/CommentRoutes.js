const router = require("express").Router();

const CommentController = require('../controllers/CommentController');

const verifyToken = require("../helpers/check-token");

router.post(
    "/create/:id", 
    verifyToken,
    CommentController.create
);
router.get(
    "/comment-by-post/:id",
    CommentController.getCommentsByPostId
);
router.patch(
    "/edit/:id",
    verifyToken,
    CommentController.editComment
)
router.delete(
    "/delete/:id",
    verifyToken,
    CommentController.deleteComment
)

module.exports = router;