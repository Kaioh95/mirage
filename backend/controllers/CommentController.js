const jwt = require('jsonwebtoken')

const Comment = require('../models/Comment')

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
            return res.status(400).json({msg: "Token inválido!"});
        }
        const user = await getUserByToken(token)

        const text = req.body.text
        const post_id = req.params.id

        if(!text){
            res.status(422).json({msg: "Texto do comentário é obrigatório"})
            return
        }
        
        try{
            const newComment = new Comment({
                text: text,
                post_id: post_id,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                },
            })
            await newComment.save()

            res.status(201).json({msg: 'Comentario criado com sucesso!'})
        }catch(error){
            res.status(500).json({msg: error})
        }
    }

    static async getCommentsByPostId(req, res){
        const post_id = req.params.id

        if(!ObjectId.isValid(post_id)){
            res.status(422).json({msg: "ID inválido"})
            return
        }

        const commentsByPost = await Comment.find({post_id: post_id}).sort('-createdAt')

        if(!commentsByPost){
            res.status(422).json({msg: "Nenhum comentário neste post!"})
            return
        }

        res.status(200).json({comments: commentsByPost})
    }

    static async countCommentsByPostId(req, res){
        const post_id = req.params.id

        if(!ObjectId.isValid(post_id)){
            res.status(422).json({msg: "ID inválido"})
            return
        }

        const commentsCount = await Comment.find({post_id: post_id}).count()

        res.status(200).json({commentsCount: commentsCount})
    }

    static async editComment(req, res){
        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.status(422).json({msg: "ID inválido"})
            return
        }

        const token = getToken(req)
        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            return res.status(400).json({msg: "Token inválido!"});
        }
        const user = await getUserByToken(token)
        const text = req.body.text

        const comment = await Comment.findById(id)
        comment.text = text

        try{
            const updatedComment = await Comment.findOneAndUpdate(
                { id: comment.id },
                { $set: comment },
                { new: true },
            )

            res.status(200).json({
                msg: "Comentário atualizado",
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
            return res.status(400).json({msg: "Token inválido!"});
        }
        const user = await getUserByToken(token)
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ msg: 'ID inválido!' })
            return
        }

        const comment = await Comment.findById({_id: id})

        if(!comment){
            res.status(422).json({ msg: 'Comentário não encontrado!' })
            return
        }
        if(!comment.user._id.equals(user._id)){
            res.status(422).json({ msg: 'Sem permissão para deletar este comentário!' })
            return
        }

        try{
            await Comment.deleteOne({ _id: id })
            res.status(200).json({ msg: 'Comentário removido com sucesso!' })
        } catch(error){
            res.status(500).json({ error: error })
        }
    }

}

