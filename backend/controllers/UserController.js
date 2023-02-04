const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

// helpers
const checkToken = require('../helpers/check-token')
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const createUserToken = require('../helpers/create-user-token')
const { imageUpload } = require('../helpers/image-upload')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class UserController{
    static async bemVindo(req, res) {
        res.status(200).json({msg: 'Bem vindo a nossa API!'})
    }

    static async verUserPrivate(req, res) {
        const id = req.params.id
    
        if (!ObjectId.isValid(id)) {
            res.status(422).json({ msg: 'Invalid Id!' })
            return
        }

        // check if user exists
        const user = await User.findById(id, '-password')
    
        if(!user){
            res.status(422).json({msg: 'User not found!'})
            return
        }
    
        return res.status(200).json({ user, msg: 'Hello User!'})
    }

    static async register(req, res) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password
        const confirmpassword = req.body.confirmpassword
        
        if(!name){
            return res.status(422).json({msg: 'Name is required!'})
        }
    
        if(!email){
            return res.status(422).json({msg: 'Email is required!'})
        }
    
        if(!password){
            return res.status(422).json({msg: 'Password is required!'})
        }
    
        if(password !== confirmpassword){
            return res.status(422).json({msg: 'Confirm password do not match!'})
        }
    
        // check if user email exists
        const userExists = await User.findOne({email: email})
    
        if(userExists){
            return res.status(422).json({msg: 'Please use another email.'})
        }
    
        // create password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
    
        // create user
        const user = new User({
            name,
            email,
            password: passwordHash,
        })
    
        try{
            const newUser = await user.save()
    
            await createUserToken(newUser, req, res)
        } catch(error){
            res.status(500).json({msg: error})
        }
    
    }

    static async login(req, res) {
        const email = req.body.email
        const password = req.body.password
    
        // validations
        if(!email){
            return res.status(422).json({msg: 'Email is required!'})
        }
    
        if(!password){
            return res.status(422).json({msg: 'Password is required'})
        }
    
        // check if user exists
        const user = await User.findOne({email: email})
    
        if(!user){
            return res.status(422).json({msg: 'User not found'})
        }
    
        // check if password match
        const checkPassword = await bcrypt.compare(password, user.password)
    
        if(!checkPassword){
            return res.status(422).json({msg: 'Invalid password!'})
        }
    
        await createUserToken(user, req, res)
    }

    static async getUserById(req, res){
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ msg: 'Invalid Id!' })
            return
        }

        const user = await User.findById(id, '-password')

        if(!user){
            res.status(422).json({ msg: 'User not found!'})
            return
        }

        res.status(200).json({ user, msg: 'User found!' })

    }

    static async getAllUsers(req, res){
        const users = await User.find().sort('-createdAt')

        res.status(200).json({ users: users, msg: 'Users found!'})
    }

    static async checkUser(req, res){
        let currentUser

        if(req.headers.authorization){
            const token = getToken(req)
            try{
                const decoded = jwt.verify(token, 'nossosecret')
            } catch(error){
                return res.status(400).json({msg: "Token Invalid!"});
            }
            const decoded = jwt.verify(token, 'nossosecret')
            currentUser = await User.findById(decoded.id)

            if(!currentUser){
                res.status(422).json({ msg: 'User not found!'})
                return
            }

            currentUser.password = undefined
        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)
    }

    static async editUserNameImg(req, res){
        const token = getToken(req)
        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            return res.status(400).json({msg: "Token Invalid!"});
        }
        const user = await getUserByToken(token)
        
        const name = req.body.name
        const email = req.body.email
        const password = user.password
        const created_at = user.created_at

        let image = ''
        if(req.file){
            image = req.file.filename
            console.log(req.file)
        }

        if(!name){
            res.status(422).json({msg: 'Name is required!'})
            return
        }

        user.name = name

        if(!email){
            res.status(422).json({msg: 'Email is required!'})
            return
        }

        // Verifica se usuário existe
        const userExists = await User.findOne({email: email})

        if( user.email !== email && userExists){
            res.status(422).json({ msg: 'Please use another email!' })
            return
        }

        user.email = email

        if(image){
            const imageName = req.file.filename
            user.image = imageName
        }

        if(!password){
            res.status(422).json({msg: 'Password is required'})
            return
        }

        try{
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $set: user },
                { new: true },
            )
            res.json({
                msg: 'Updated User!',
                data: updatedUser,
            })
        } catch(error) {
            res.status(500).json({ msg: error })
        }

    }

    static async deleteUser(req, res){
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ msg: 'Invalid Id!' })
            return
        }

        const user = await User.findById({ _id: id})

        if(!user){
            res.status(422).json({ msg: 'User not found!' })
            return
        }

        try{
            await User.deleteOne({ _id: id })
            res.status(200).json({ msg: 'User removed!' })
        } catch(error){
            res.status(500).json({ error: error })
        }
    }

}