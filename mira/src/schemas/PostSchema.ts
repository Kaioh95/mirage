import * as yup from "yup"

export const PostSchema = yup.object().shape({
    image: yup.mixed().required(),
    title: yup.string().min(1).required(),
    tags: yup.string().min(1).required(),
    description: yup.string().min(3).required(),
})