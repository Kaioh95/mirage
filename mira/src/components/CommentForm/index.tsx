import { Field, Formik, FormikHelpers } from "formik"
import { CommentCustomForm, CommentInput, CommentFormFooter, SendCommentButton } from "./styles"
import { CommentShema } from "../../schemas/CommentSchema"

function CommentForm(){

    const onSubmit = async (values: {text: string}, actions: FormikHelpers<{text: string}>) => {
        console.log(values)
    }

    return(
        <Formik
            initialValues={{
                text: '',
            }}
            validationSchema={CommentShema}
            onSubmit={onSubmit}
        >
            <CommentCustomForm>
                <Field 
                    name='text'
                    type='text'
                    placeholder='Write a comment!'
                    as={CommentInput}
                />
                <CommentFormFooter>
                    <SendCommentButton type="submit">Send</SendCommentButton>
                </CommentFormFooter>
            </CommentCustomForm>
        </Formik>
    )
}

export default CommentForm;