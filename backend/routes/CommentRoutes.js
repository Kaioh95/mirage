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
router.get(
    "/comment-by-user/:id",
    CommentController.getCommentsByUserId
);
router.get(
    "/comment-count/:id",
    CommentController.countCommentsByPostId
);
router.patch(
    "/edit/:id",
    verifyToken,
    CommentController.editComment
);
router.delete(
    "/delete/:id",
    verifyToken,
    CommentController.deleteComment
);

module.exports = router;