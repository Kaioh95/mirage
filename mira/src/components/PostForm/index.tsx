import { Field, FormikHelpers, FormikProvider, FormikValues, useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { PostSchema } from "../../schemas/PostSchema";
import { CreatePostButton, CustomInput, CustomLabel, FormGroupDiv, PostCustomForm, PostFormFooter, PostImg } from "./styles";
import DefaultImg from "../../assets/imagen.png";
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";

interface PostValues extends FormikValues{
    image: string
    title: string,
    tags: string,
    description: string,
}

function PostForm(){
    const { createPost, isCreatePostLoading } = useContext(PostContext);

    const initialValues={
        image: "",
        title: "",
        tags: "",
        description: "",
    }

    const [imgState, setImgState] = useState({
        path: "",
    });

    const [imageState, setImageState] = useState({
        image: "",
    });

    useEffect(() => {
        formik.setFieldValue("image", imageState?.image);
    }, [imageState?.image]);

    const handleFileChange = (e: any) => {
        setImageState({
            image: e.target.files[0]
        })
        setImgState({
            ...imgState,
            path: URL.createObjectURL(e.target.files[0])
        })
    }

    const onSubmit = async (values: PostValues, actions: FormikHelpers<PostValues>) => {
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${JSON.parse(token || JSON.stringify("TOKEN_MISSING"))}`,
        }

        const { success: response , error} = await createPost(values, headers);

        if(error){
            toast.error(error.message);
        }

        if(response){
            toast.success(response?.msg);
        }
        actions.resetForm();
    }

    const formik = useFormik({initialValues, onSubmit, validationSchema: PostSchema});

    return(
        <FormikProvider value={formik}>
            <PostCustomForm>
                <FormGroupDiv className="ImgContent">
                    <PostImg src={imgState.path !== ""? imgState.path : DefaultImg}/>
                    <CustomInput
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />
                </FormGroupDiv>

                <FormGroupDiv>
                    <CustomLabel>Title</CustomLabel>
                    <Field
                        name='title'
                        type='text'
                        placeholder='Enter a Title'
                        as={CustomInput}
                    />

                    <CustomLabel>Tags</CustomLabel>
                    <Field
                        name='tags'
                        type='text'
                        placeholder='pets, games, memes'
                        as={CustomInput}
                    />

                    <CustomLabel>Description</CustomLabel>
                    <Field
                        name='description'
                        type='text'
                        placeholder='Enter a description'
                        as={CustomInput}
                    />

                    <PostFormFooter>
                        <CreatePostButton
                            type="submit"
                        >
                            Post
                        </CreatePostButton>
                    </PostFormFooter>
                </FormGroupDiv>
            </PostCustomForm>
        </FormikProvider>
    )
}

export default PostForm;