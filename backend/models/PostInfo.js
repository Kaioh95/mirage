const mongoose = require("../db/conn")
const { Schema } = mongoose

const PostInfo = mongoose.model('PostInfo',
    new Schema({
        post_id: {
            type: mongoose.Types.ObjectId,
            require: true,
        },
        user_id: {
            type: mongoose.Types.ObjectId,
            require: true,
        },
        like: {
            type: Boolean,
            default: false,
        },
    }, {timestamps: true}),
);

module.exports = PostInfo