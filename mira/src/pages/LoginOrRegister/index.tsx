import { ErrorMessage, Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { Button, CustomInput, FormCard, FormError, FormFooter, ImgLink, InputIcon, InputIconContainer, LoginRegisterContainer } from "./styles";
import { LoginShema } from "../../schemas/LoginSchema";
import { SignUpSchema } from "../../schemas/SignUpSchema";
import { LockIcon, UserIcon } from "../../components/Icons";
import { useContext, useState } from "react";
import LogoImg from '../../assets/logo.png'
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";

interface LoginSignUpRequest extends FormikValues{
    name?: string
    email: string
    password: string
    confirmPassword?: string
    dummyData?: string
}

interface LoginOrRegisterProps{
    isLoginMode?: boolean;
}

function LoginOrRegister(props: LoginOrRegisterProps){
    const [loginMode, setLoginMode] = useState<boolean>(props.isLoginMode? true : false);
    const { isUserLoginLoading, isUserRegisterLoading, loginUser } = useContext(UserContext)

    const changeMode = () => {
        if(loginMode){
            setLoginMode(false)
        }
        else{
            setLoginMode(true)
        }
    }

    const onSubmit = async (values: LoginSignUpRequest, actions: FormikHelpers<LoginSignUpRequest>) => {
        const { success: response , error} = await loginUser(values);

        if(error){
            toast.error(error.message)
        }

        console.log(response)
        actions.resetForm()
    }

    return(
        <LoginRegisterContainer>
            <FormCard>
                <ImgLink to="/">
                    <img src={LogoImg}/>
                </ImgLink>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        password: '',
                        confirmPassword: ''
                    }}
                    validationSchema={loginMode? LoginShema : SignUpSchema}
                    onSubmit={onSubmit}
                >
                    <Form>
                        {!loginMode ? (
                            <InputIconContainer>
                                <Field
                                    name='name'
                                    type='text'
                                    placeholder='Insert your name'
                                    as={CustomInput}
                                />

                                <ErrorMessage component={FormError} name="name"/>
                            </InputIconContainer>
                        ) : ''}
                        <InputIconContainer>
                            <Field
                                name='email'
                                type='text'
                                placeholder='Insert email'
                                as={CustomInput}
                            />
                            <InputIcon type='button'>
                                {UserIcon}
                            </InputIcon>

                            <ErrorMessage component={FormError} name="email"/>
                        </InputIconContainer>

                        <InputIconContainer>
                            <Field
                                name='password'
                                type='password'
                                placeholder='Insert password'
                                as={CustomInput}
                            />
                            <InputIcon type='button'>
                                {LockIcon}
                            </InputIcon>

                            <ErrorMessage component={FormError} name="password"/>
                        </InputIconContainer>

                        {!loginMode ? (
                            <InputIconContainer>
                                <Field
                                    name='confirmPassword'
                                    type='text'
                                    placeholder='Confirm Password'
                                    as={CustomInput}
                                />
                                <InputIcon type='button'>
                                    {LockIcon}
                                </InputIcon>

                                <ErrorMessage component={FormError} name="confirmPassword"/>
                            </InputIconContainer>
                        ) : ''}
                        <InputIconContainer></InputIconContainer>

                        <FormFooter>
                            <Button type="submit">{loginMode? 'Log In' : 'Sign Up'}</Button>
                        </FormFooter>
                    </Form>
                </Formik>
            </FormCard>
        </LoginRegisterContainer>
    )
};

export default LoginOrRegister;