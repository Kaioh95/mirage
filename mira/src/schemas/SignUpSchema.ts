import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

export const SignUpSchema = yup.object().shape({
    name: yup.string().min(3).required("Required"),
    email: yup.string().email("Please enter a valid e-mail").required("Required"),
    password: yup.string().min(6).matches(
        passwordRules,
        {message:"min 6 chars max 20, 1 upper letter, 1 lower letter, 1 digit"}).required("Required"),
    confirmPassword: yup.string().min(6).matches(
        passwordRules,
        {message:"min 6 chars max 20, 1 upper letter, 1 lower letter, 1 digit"}).required("Required"),
})