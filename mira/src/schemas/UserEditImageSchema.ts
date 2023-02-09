import * as yup from "yup"

export const UserEditImageSchema = yup.object().shape({
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
    name: yup.string().min(3).required("Required"),
})