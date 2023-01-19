import * as yup from "yup"

export const LoginShema = yup.object().shape({
    email: yup.string().min(3).required("Required"),
    password: yup.string().required("Required")
})