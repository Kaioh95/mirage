import * as yup from "yup"

export const PostSchema = yup.object().shape({
    image: yup.mixed()
        .test('required', "Please upload a post photo", (value) => {
            return value != null
        })
        .test('type', "We only support  jpeg, jpg, png and gif format", (value) => {
            return value && (value.type === "image/jpg" 
                || value.type === "image/jpeg" 
                || value.type === "image/png" 
                || value.type === "image/gif")
        }),
    title: yup.string().min(1).required(),
    tags: yup.string().min(1).required(),
    description: yup.string().min(3).required(),
})