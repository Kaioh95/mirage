import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { Button, CustomInput, FormCard, FormError, FormFooter, InputIcon, InputIconContainer, LoginRegisterContainer } from "./styles";
import { UserLoginRequest } from '../../contexts/UserContext'
import { LoginShema } from "../../schemas/LoginSchema";
import { LockIcon, UserIcon } from "../../components/Icons";

function LoginOrRegister(){

    const onSubmit = async (values: UserLoginRequest, actions: FormikHelpers<UserLoginRequest>) => {
        console.log("AAAAA")
        console.log(values)
        actions.resetForm()
    }

    return(
        <LoginRegisterContainer>
            <FormCard>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={LoginShema}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <InputIconContainer>
                            <Field
                                name='email'
                                type='email'
                                placeholder='Enter email'
                                component={CustomInput}
                            />
                            <InputIcon type='button'>
                                {UserIcon}
                            </InputIcon>
                        </InputIconContainer>
                        <ErrorMessage component={FormError} name="email"/>

                        <InputIconContainer>
                            <Field
                                name='password'
                                type='password'
                                placeholder='Enter password'
                                as={CustomInput}
                            />
                            <InputIcon type='button'>
                                {LockIcon}
                            </InputIcon>
                        </InputIconContainer>
                        <ErrorMessage component={FormError} name="password"/>

                        <FormFooter>
                            <Button type="submit">Log In</Button>
                        </FormFooter>
                    </Form>
                </Formik>
            </FormCard>
        </LoginRegisterContainer>
    )
};

export default LoginOrRegister;