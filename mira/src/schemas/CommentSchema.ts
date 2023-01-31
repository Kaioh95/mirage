import * as yup from "yup"

export const CommentShema = yup.object().shape({
    text: yup.string().min(1).required()
})