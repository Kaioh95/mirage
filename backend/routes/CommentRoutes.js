const router = require("express").Router();

const CommentController = require('../controllers/CommentController');

const verifyToken = require("../helpers/check-token");

router.post(
    "/create/:id", 
    verifyToken,
    CommentController.create
);