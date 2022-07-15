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

}

