const jwt = require('jsonwebtoken')

const Post = require('../models/Post')
const PostInfo = require('../models/PostInfo')
const Comment = require('../models/Comment')

// helpers
const checkToken = require('../helpers/check-token')
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const { imageUpload } = require('../helpers/image-upload')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PostController{

    static async create(req, res){
        const token = getToken(req)
        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            return res.status(400).json({msg: "Token inválido!"});
        }
        const user = await getUserByToken(token)

        const title = req.body.title
        const tags = req.body.tags
        const description = req.body.description
        
        let image = ''
        if(req.file){
            image = req.file.filename
        }
        else{
            res.status(422).json({msg: 'A imagem é obrigatória'})
            return
        }

        if(!title){
            res.status(422).json({msg: 'O título é obrigatório'})
            return
        }

        if(tags && tags.split(',') > 5){
            res.status(422).json({msg: 'Insira no máximo 5 tags'})
            return
        }

        if(description && description.length > 256){
            res.status(422).json({msg: 'A descrição deve ter no máximo 256 caracteres'})
            return
        }

        let arrayTags = tags.split(',').map(element => element.trim())
        try{
            const newPost = new Post({
                title: title,
                tags: arrayTags,
                description: description,
                image: image,
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                },
            })
            await newPost.save()

            res.status(201).json({msg: 'Post criado com sucesso!'})
        }catch(error){
            res.status(500).json({msg: error})
        }

    }

    static async getPostById(req, res){
        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.status(422).json({msg: "ID inválido"})
            return
        }

        const post = await Post.findById(id)

        if(!post){
            res.status(422).json({msg: "Post não encontrado"})
            return
        }

        res.status(200).json({ post })
    }

    static async getLastFiftyPosts(req, res){
        const skip = req.query.skip
        const limit = req.query.limit
        
        const posts = await Post.find().sort('-createdAt').skip(skip).limit(limit)
        const postsInfo = posts.map(async (post, index) => {
            const views = await PostInfo.find({post_id: post._id}).count()
            const likes = await PostInfo.find({post_id: post._id, like: true}).count()
            const comments = await Comment.find({post_id: post._id}).count()
            
            return {...post.toObject(), views, likes, comments}
        })
        const postsN = await Promise.all(postsInfo)

        res.status(200).json({ posts: postsN, })
    }

    static async getAllPosts(req, res){
        const skip = req.query.skip
        const limit = req.query.limit

        const posts = await Post.find().sort('-createdAt').skip(skip).limit(limit)
        res.status(200).json({ posts: posts, })
    }

    static async searchPostByTitle(req, res){
        const text = req.params.text
        const sortFilter = req.query.sort
        const skip = req.query.skip
        const limit = req.query.limit

        if(!text){
            res.status(422).json({msg: "Texto inválido"})
            return
        }
        const regexSrc = new RegExp(text.trim(), 'i')
        const posts = await Post.find({title: {$regex: regexSrc}}).sort(sortFilter).skip(skip).limit(limit)
        res.status(200).json({ posts: posts, })
    }

    static async searchPostByTag(req, res){
        const tag = req.params.tag
        if(!tag){
            res.status(422).json({msg: "Tag inválida"})
            return
        }

        const regexSrc = new RegExp(tag.trim(), 'i')
        const posts = await Post.find({tags: {$regex: regexSrc}}).sort('-createdAt')
        res.status(200).json({ posts: posts, })
    }

    static async deletePost(req, res){
        const token = getToken(req)
        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            return res.status(400).json({msg: "Token inválido!"});
        }

        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ msg: 'ID inválido!' })
            return
        }

        const post = await Post.findById({ _id: id})

        if(!post){
            res.status(422).json({ msg: 'Post não encontrado!' })
            return
        }

        try{
            await Post.deleteOne({ _id: id })
            res.status(200).json({ msg: 'Post removido com sucesso!' })
        } catch(error){
            res.status(500).json({ error: error })
        }
    }

    static async editPost(req, res){
        const token = getToken(req)
        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            return res.status(400).json({msg: "Token inválido!"});
        }

        const title = req.body.title
        const tags = req.body.tags
        const description = req.body.description
        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.status(422).json({msg: "ID inválido"})
            return
        }

        const post = await Post.findById(id)
        
        let image = ''
        if(req.file){
            image = req.file.filename
        }
        else{
            res.status(422).json({msg: 'A imagem é obrigatória'})
            return
        }

        if(!title){
            res.status(422).json({msg: 'O título é obrigatório'})
            return
        }

        if(tags && tags.split(',') > 5){
            res.status(422).json({msg: 'Insira no máximo 5 tags'})
            return
        }

        if(description && description.length > 256){
            res.status(422).json({msg: 'A descrição deve ter no máximo 256 caracteres'})
            return
        }

        let arrayTags = tags.split(',').map(element => element.trim())
        const user = await getUserByToken(token)

        post.title = title
        post.tags = arrayTags
        post.description = description
        post.image = image
        post.user = user

        try{
            const updatedPost = await Post.findOneAndUpdate(
                { _id: post._id },
                { $set: post },
                { new: true },
            )
            res.json({
                msg: 'Post atualizado com sucesso!',
                data: updatedPost,
            })
        } catch(error) {
            res.status(500).json({ msg: error })
        }
    }

}