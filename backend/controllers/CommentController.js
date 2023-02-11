const jwt = require('jsonwebtoken')

const Comment = require('../models/Comment')
const User = require('../models/User')

// helpers
const checkToken = require('../helpers/check-token')
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class CommentController{

    static async create(req, res){
        const token = getToken(req)
        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            return res.status(400).json({msg: "Invalid Token!"});
        }
        const user = await getUserByToken(token)

        const text = req.body.text
        const post_id = req.params.id

        if(!text){
            res.status(422).json({msg: "Text is required."})
            return
        }
        
        try{
            const newComment = new Comment({
                text: text,
                post_id: post_id,
                user_id: user._id,
            })
            await newComment.save()

            res.status(201).json({msg: 'Comment created!'})
        }catch(error){
            res.status(500).json({msg: error})
        }
    }

    static async getCommentsByPostId(req, res){
        const post_id = req.params.id
        const skip = req.query.skip
        const limit = req.query.limit

        if(!ObjectId.isValid(post_id)){
            res.status(422).json({msg: "Invalid Id!"})
            return
        }

        const commentsByPost = await Comment.find({post_id: post_id}).sort('-createdAt').skip(skip).limit(limit)

        if(!commentsByPost){
            res.status(422).json({msg: "No comments on this post!"})
            return
        }

        const commentsInfo = commentsByPost.map(async (com) => {
            const user = await User.findById(com.user_id);
            
            return {...com.toObject(), user}
        })
        const commentsByPostN = await Promise.all(commentsInfo)

        res.status(200).json({comments: commentsByPostN, msg: 'Comments found!'})
    }

    static async getCommentsByUserId(req, res){
        const id = req.params.id
        const skip = req.query.skip
        const limit = req.query.limit

        if(!ObjectId.isValid(id)){
            res.status(422).json({msg: "Invalid Id!"})
            return
        }

        const commentsByUser = await Comment.find({user_id: id}).sort('-createdAt').skip(skip).limit(limit)

        if(!commentsByUser){
            res.status(422).json({msg: "No comments on this post!"})
            return
        }

        const commentsInfo = commentsByUser.map(async (com) => {
            const user = await User.findById(com.user_id);
            
            return {...com.toObject(), user}
        })
        const commentsByUserN = await Promise.all(commentsInfo)

        res.status(200).json({comments: commentsByUserN, msg: 'Comments found!'})
    }

    static async countCommentsByPostId(req, res){
        const post_id = req.params.id

        if(!ObjectId.isValid(post_id)){
            res.status(422).json({msg: "Invalid Id!"})
            return
        }

        const commentsCount = await Comment.find({post_id: post_id}).count()

        res.status(200).json({commentsCount: commentsCount, msg: 'Number of comment by post!'})
    }

    static async editComment(req, res){
        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.status(422).json({msg: "Invalid Id!"})
            return
        }

        const token = getToken(req)
        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            return res.status(400).json({msg: "Invalid Token!"});
        }
        const user = await getUserByToken(token)
        const text = req.body.text

        if(!text){
            return res.status(422).json({msg: "Insert Text"})
        }

        const comment = await Comment.findById(id)
        comment.text = text
        comment.user_id = user._id

        try{
            const updatedComment = await Comment.findOneAndUpdate(
                { _id: comment._id },
                { $set: comment },
                { new: true },
            )

            res.status(200).json({
                msg: "Updated comment!",
                data: updatedComment,
            })
        }catch(error){
            res.status(500).json({ msg: error})
        }
    }

    static async deleteComment(req, res){
        const token = getToken(req)
        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            return res.status(400).json({msg: "Invalid Token!"});
        }
        const user = await getUserByToken(token)
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ msg: 'Invalid Id!' })
            return
        }

        const comment = await Comment.findById({_id: id})

        if(!comment){
            res.status(422).json({ msg: 'Comment not found!' })
            return
        }
        if(!comment.user_id.equals(user._id)){
            res.status(422).json({ msg: 'No permission to delete this comment!' })
            return
        }

        try{
            await Comment.deleteOne({ _id: id })
            res.status(200).json({ msg: 'Comment removed!' })
        } catch(error){
            res.status(500).json({ error: error })
        }
    }

}

