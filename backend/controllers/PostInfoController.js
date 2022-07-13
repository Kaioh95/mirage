const jwt = require('jsonwebtoken')

const PostInfo = require('../models/PostInfo')

// helpers
const checkToken = require('../helpers/check-token')
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const { imageUpload } = require('../helpers/image-upload')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PostIndoController{
    static async create(req, res){
        const token = getToken(req)
        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            res.status(400).json({msg: "Token inválido!"});
            return
        }

        const user = await getUserByToken(token)
        const post_id = req.params.id
        const like = req.body.like

        if(!ObjectId.isValid(post_id)){
            res.status(422).json({msg: "ID inválido"})
            return
        }

        const userExists = await PostInfo.findOne({post_id: post_id, user_id: user._id})

        if(userExists){
            res.status(422).json({msg: 'Usuário já visualizou o post'})
            return
        }

        try{
            const newPostInfo = new PostInfo({
                post_id: ObjectId(post_id),
                user_id: ObjectId(user._id),
                like: like,
            })
            await newPostInfo.save()

            res.status(201).json({msg: 'Informações de post atualizadas!'})
        }catch(error){
            res.status(500).json({msg: error})
        }
    }

    static async countPostViewsLikes(req, res){
        const post_id = req.params.id

        if(!ObjectId.isValid(post_id)){
            res.status(422).json({msg: "ID inválido"})
            return
        }

        const viewsCount = await PostInfo.find({post_id: post_id}).count()
        const likesCount = await PostInfo.find({post_id: post_id, like: true}).count()
        res.status(200).json({
            views: viewsCount,
            likes: likesCount,
        })
    }

    static async countUserViewLikes(req, res){
        const user_id = req.params.id

        if(!ObjectId.isValid(user_id)){
            res.status(422).json({msg: "ID inválido"})
            return
        }

        const viewsCount = await PostInfo.find({user_id: user_id}).count()
        const likesCount = await PostInfo.find({user_id: user_id, like: true}).count()
        res.status(200).json({
            views: viewsCount,
            likes: likesCount,
        })
    }

    static async getPostInfoByUser(req, res){
        const post_id = req.params.id

        if(!ObjectId.isValid(post_id)){
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

        const postInfoUser = await PostInfo.findOne({post_id: post_id, user_id: user._id})
        res.status(200).json({
            data: postInfoUser
        })
    }

    static async editLike(req, res){
        const token = getToken(req)
        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            return res.status(400).json({msg: "Token inválido!"});
        }

        const user = await getUserByToken(token)
        const post_id = req.params.id
        //const like = req.body.like

        if(!ObjectId.isValid(post_id)){
            res.status(422).json({msg: "ID inválido"})
            return
        }

        const postInfo = await PostInfo.findOne({user_id: user._id, post_id: post_id})
        if(!postInfo){
            res.status(422).json({msg: "informações de Post não encontradas!"})
        }
        if(postInfo.like){
            postInfo.like = false
        }else{
            postInfo.like = true
        }

        try{
            //const updatedPostInfo = await PostInfo.findByIdAndUpdate(postInfo._id, postInfo)
            const updatedPostInfo = await PostInfo.findOneAndUpdate(
                { _id: postInfo._id },
                { $set: postInfo },
                { new: true },
            )
            res.json({
                msg: 'Like registrado!',
                data: updatedPostInfo,
            })
        } catch(error) {
            res.status(500).json({ msg: error })
        }
    }

    static async deleteInfo(req, res){
        const post_id = req.params.id

        if(!ObjectId.isValid(post_id)){
            res.status(422).json({msg: "ID inválido"})
            return
        }

        try{
            await PostInfo.deleteMany({ post_id: post_id })
            res.status(200).json({ msg: 'Post Info removido com sucesso!' })
        } catch(error){
            res.status(500).json({ error: error })
        }
    }
}