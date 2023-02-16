const jwt = require('jsonwebtoken')

const Post = require('../models/Post')
const User = require('../models/User')
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
            return res.status(400).json({msg: "Invalid Token!"});
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
            res.status(422).json({msg: 'Image is required!'})
            return
        }

        if(!title){
            res.status(422).json({msg: 'Title is required!'})
            return
        }

        if(tags && tags.split(',') > 5){
            res.status(422).json({msg: 'Enter a maximum of 5 tags!'})
            return
        }

        if(description && description.length > 256){
            res.status(422).json({msg: 'The description must be a maximum of 256 characters!'})
            return
        }

        let arrayTags = tags.split(',').map(element => element.trim())
        try{
            const newPost = new Post({
                title: title,
                tags: arrayTags,
                description: description,
                image: image,
                user_id: user._id,
            })
            await newPost.save()

            res.status(201).json({msg: 'Post created!'})
        }catch(error){
            res.status(500).json({msg: error})
        }

    }

    static async getPostById(req, res){
        const id = req.params.id;

        if(!ObjectId.isValid(id)){
            res.status(422).json({msg: "ID invalid!"});
            return;
        }

        const post = await Post.findById(id);

        if(!post){
            res.status(422).json({msg: "Post not found!"});
            return;
        }

        const user = await User.findById(post.user_id);
        const views = await PostInfo.find({post_id: post._id}).count();
        const likes = await PostInfo.find({post_id: post._id, like: true}).count()
        const comments = await Comment.find({post_id: post._id}).count();
        
        const postWithInfo = {...post.toObject(), user, views, likes, comments}

        res.status(200).json({ post: postWithInfo, msg: "Post found!"});
    }

    static async getPostsByUserId(req, res){
        const id = req.params.id;
        const skip = req.query.skip
        const limit = req.query.limit

        if(!ObjectId.isValid(id)){
            res.status(422).json({msg: "User ID invalid!"});
            return;
        }

        const posts = await Post.find({user_id: id}).sort('-createdAt').skip(skip).limit(limit);

        if(!posts){
            res.status(422).json({msg: "Posts not found!"});
            return;
        }

        const postsInfo = posts.map(async (post) => {
            const views = await PostInfo.find({post_id: post._id}).count()
            const likes = await PostInfo.find({post_id: post._id, like: true}).count()
            const comments = await Comment.find({post_id: post._id}).count()
            
            return {...post.toObject(), views, likes, comments}
        })
        const postsN = await Promise.all(postsInfo)

        res.status(200).json({ posts: postsN, msg: 'Posts found!'})
    }

    static async getPostsLikedByUserId(req, res){
        const id = req.params.id;
        const skip = req.query.skip
        const limit = req.query.limit

        if(!ObjectId.isValid(id)){
            res.status(422).json({msg: "User ID invalid!"});
            return;
        }

        const postsIds = await PostInfo.find({user_id: id, like: true}).sort('-updatedAt').skip(skip).limit(limit);

        if(!postsIds){
            res.status(422).json({msg: "Posts not found!"});
            return;
        }

        const postsLiked = postsIds.reduce(async (result, pInfo) => {
                const postLiked = await Post.findById(pInfo.post_id)
                const views = await PostInfo.find({post_id: pInfo.post_id}).count()
                const likes = await PostInfo.find({post_id: pInfo.post_id, like: true}).count()
                const comments = await Comment.find({post_id: pInfo.post_id}).count()

                const resultA = await result;
                if(!postLiked)
                    return resultA

                resultA.push({...postLiked.toObject(), views, likes, comments});
                return result;
        }, []);
        const postsN = postsLiked.length !==0 ? await postsLiked.then(result => result) : postsLiked;

        /*const postsLiked = postsIds.map(async (pInfo) => {
            const postLiked = await Post.findById(pInfo.post_id)
            const views = await PostInfo.find({post_id: pInfo.post_id}).count()
            const likes = await PostInfo.find({post_id: pInfo.post_id, like: true}).count()
            const comments = await Comment.find({post_id: pInfo.post_id}).count()

            return {...postLiked.toObject(), views, likes, comments};
        })
        const postsN = await Promise.all(postsLiked)*/

        res.status(200).json({ posts: postsN, msg: 'Posts found!'})
    }

    static async getLastFiftyPosts(req, res){
        const skip = req.query.skip
        const limit = req.query.limit
        
        const posts = await Post.find().sort('-createdAt').skip(skip).limit(limit)
        
        if(!posts){
            res.status(422).json({msg: "Posts not found!"});
            return;
        }

        const postsInfo = posts.map(async (post) => {
            const views = await PostInfo.find({post_id: post._id}).count()
            const likes = await PostInfo.find({post_id: post._id, like: true}).count()
            const comments = await Comment.find({post_id: post._id}).count()
            
            return {...post.toObject(), views, likes, comments}
        })
        const postsN = await Promise.all(postsInfo)

        res.status(200).json({ posts: postsN, msg: 'Posts found!'})
    }

    static async getAllPosts(req, res){
        const skip = req.query.skip
        const limit = req.query.limit

        const posts = await Post.find().sort('-createdAt').skip(skip).limit(limit)
        const postsInfo = posts.map(async (post) => {
            const user = await User.findById(post.user_id);
            
            return {...post.toObject(), user}
        })
        const postsN = await Promise.all(postsInfo)
        res.status(200).json({ posts: postsN, msg: 'Posts found!'})
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
        const posts = await Post.find({title: {$regex: regexSrc}}).sort('-createdAt').skip(skip).limit(limit)

        res.status(200).json({ posts: posts, msg: 'Posts found!'})
    }

    static async searchPostByTag(req, res){
        const tag = req.params.tag
        const skip = req.query.skip
        const limit = req.query.limit

        if(!tag){
            res.status(422).json({msg: "Invalid Tag!"})
            return
        }

        const regexSrc = new RegExp(tag.trim(), 'i')
        const posts = await Post.find({tags: {$regex: regexSrc}}).sort('-createdAt').skip(skip).limit(limit)

        res.status(200).json({ posts: posts, msg: 'Posts found!'})
    }

    static async deletePost(req, res){
        const token = getToken(req)
        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            return res.status(400).json({msg: "Invalid token!"});
        }
        const user = await getUserByToken(token)

        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(422).json({ msg: 'ID inválido!' })
            return
        }

        const post = await Post.findById({ _id: id})

        if(!post){
            res.status(422).json({ msg: 'Post no found!' })
            return
        }
        
        const postUser = await User.findById(post.user_id)

        if(postUser.email !== user.email || !postUser._id.equals(user._id)){
            return res.status(400).json({msg: "You do not have permission to delete this post."})
        }

        try{
            await PostInfo.deleteMany({post_id: post._id, user_id: post.user_id})
        } catch(error){
            console.log(error)
        }

        try{
            await Comment.deleteMany({post_id: post._id})
        } catch(error){
            console.log(error)
        }

        try{
            await Post.deleteOne({ _id: id })
            res.status(200).json({ msg: 'Post deleted!' })
        } catch(error){
            res.status(500).json({ error: error })
        }
    }

    static async editPost(req, res){
        const token = getToken(req)
        try{
            const decoded = jwt.verify(token, 'nossosecret')
        } catch(error){
            return res.status(400).json({msg: "Invalid token!"});
        }
        const user = await getUserByToken(token)

        const title = req.body.title
        const tags = req.body.tags
        const description = req.body.description
        const id = req.params.id

        if(!ObjectId.isValid(id)){
            res.status(422).json({msg: "Invalid ID!"})
            return
        }

        const post = await Post.findById(id)
        
        if (!post){
            res.status(422).json({msg: "Post do not exist."});
            return
        }

        const postUser = await User.findById(post.user_id)

        if(postUser.email !== user.email || !postUser._id.equals(user._id)){
            return res.status(400).json({msg: "You do not have permission to edit this post."})
        }
        
        let image = ''
        if(req.file){
            image = req.file.filename
        }
        else{
            res.status(422).json({msg: 'Image required!'})
            return
        }

        if(!title){
            res.status(422).json({msg: 'Title required!'})
            return
        }

        if(tags && tags.split(',') > 5){
            res.status(422).json({msg: 'Enter a maximum of 5 characters!'})
            return
        }

        if(description && description.length > 256){
            res.status(422).json({msg: 'The description must be a maximum of 256 characters'})
            return
        }

        let arrayTags = tags.split(',').map(element => element.trim())

        post.title = title
        post.tags = arrayTags
        post.description = description
        post.image = image
        post.user_id = user._id

        try{
            const updatedPost = await Post.findOneAndUpdate(
                { _id: post._id },
                { $set: post },
                { new: true },
            )
            res.json({
                msg: 'Updated Post!',
                data: updatedPost,
            })
        } catch(error) {
            res.status(500).json({ msg: error })
        }
    }

}