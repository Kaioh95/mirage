const mongoose = require("../db/conn")
const { Schema } = mongoose

const PostInfo = mongoose.model('PostInfo',
    new Schema({
        post_id: {
            type: String,
            require: true,
        },
        user_id: {
            type: String,
            require: true,
        },
        like: {
            type: Boolean,
            default: false,
        },
    }, {timestamps: true}),
);

module.exports = PostInfo