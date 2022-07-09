const jwt = require('jsonwebtoken')

const Post = require('../models/Post')

// helpers
const checkToken = require('../helpers/check-token')
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const createUserToken = require('../helpers/create-user-token')
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

}