const mongoose = require('../db/conn')
const { Schema } = mongoose

const Comment = mongoose.model('Comment',
    new Schema({
        text: {
            type: String,
            require: true,
        },
        post_id: {
            type: mongoose.Types.ObjectId,
            require: true,
        },
        user: Object,
    }, {timestamps: true}),
);

module.exports = Comment