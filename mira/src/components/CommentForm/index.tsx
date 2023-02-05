import { Field, Formik, FormikHelpers } from "formik"
import { CommentCustomForm, CommentInput, CommentFormFooter, SendCommentButton } from "./styles"
import { CommentSchema } from "../../schemas/CommentSchema"
import { useContext } from "react";
import { CommentContext } from "../../contexts/CommentContext";
import { toast } from "react-toastify";

interface CommentFormProps{
    postId: string;
}

function CommentForm(props: CommentFormProps){
    const { createComment , isCreatingComment } = useContext(CommentContext);

    const onSubmit = async (values: {text: string}, actions: FormikHelpers<{text: string}>) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(token || JSON.stringify("TOKEN_MISSING"))}`,
        }

        const { success: response , error} = await createComment(props.postId, values, headers);

        if(error){
            toast.error(error.message);
        }

        if(response){
            toast.success(response?.msg);
        }
        actions.resetForm();
    }

    return(
        <Formik
            initialValues={{
                text: '',
            }}
            validationSchema={CommentSchema}
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
                    <SendCommentButton type="submit"
                        disabled={isCreatingComment}
                        className={isCreatingComment? 'disabled' : ''}
                    >
                        Send
                    </SendCommentButton>
                </CommentFormFooter>
            </CommentCustomForm>
        </Formik>
    )
}

export default CommentForm;