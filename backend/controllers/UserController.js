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
            res.status(422).json({ msg: 'Invalid Id, user not found!' })
            return
        }

        const user = await User.findById(id, '-password')

        if(!user){
            res.status(422).json({ msg: 'User not found!'})
            return
        }

        res.status(200).json({ user, msg: 'User found!' })

    }

    static async getUsersByName(req, res){
        const name = req.params.name
        const skip = req.query.skip
        const limit = req.query.limit

        if(!name){
            res.status(422).json({msg: "Invalid Text."})
            return
        }
        const regexSrc = new RegExp(name.trim(), 'i')

        const users = await User.find({name: {$regex: regexSrc}}).sort('-createdAt').skip(skip).limit(limit);

        res.status(200).json({ users: users, msg: 'Users found!'})
    }

    static async getAllUsers(req, res){
        const skip = req.query.skip
        const limit = req.query.limit

        const users = await User.find().sort('-createdAt').skip(skip).limit(limit);

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
        const id = req.params.id
        const token = getToken(req)

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ msg: 'Invalid Id!' })
            return
        }
        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            return res.status(400).json({msg: "Token Invalid!"});
        }

        const user = await getUserByToken(token)
        
        if(!user){
            res.status(422).json({ msg: 'User no found!' })
            return
        }

        const userToedit = await User.findById(id)

        if(userToedit.email !== user.email || !userToedit._id.equals(user._id)){
            return res.status(400).json({msg: "You do not have permission."})
        }
        
        const name = req.body.name

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

        if(image){
            const imageName = req.file.filename
            user.image = imageName
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
        const token = getToken(req)

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ msg: 'Invalid Id!' })
            return
        }

        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            return res.status(400).json({msg: "Token Invalid!"});
        }

        const loggedUser = getUserByToken(token)
        const user = await User.findById({ _id: id})

        if(loggedUser.email !== user.email || !loggedUser._id.equals(user._id)){
            return res.status(400).json({msg: "You do not have permission."})
        }

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