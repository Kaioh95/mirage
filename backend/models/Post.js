const mongoose = require('../db/conn')
const { Schema } = mongoose

const Post = mongoose.model('Post',
    new Schema({
        title: {
            type: String,
            require: true,
        },
        tags: {
            type: Array,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            require: true,
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            require: true,
        },
    }, {timestamps: true}),
); // View e Likes serão modelos com id do usuário que visualizou ou deu like

module.exports = Post