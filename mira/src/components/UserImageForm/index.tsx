import { ErrorMessage, Field, FormikHelpers, FormikProvider, FormikValues, useFormik } from "formik";
import { createRef, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/UserContext";
import { UserEditImageSchema } from "../../schemas/UserEditImageSchema";
import { CustomInput, FormError, FormGroupDiv, PostImg, UploadIcon, UserCustomForm } from "./styles";
import { useParams } from "react-router-dom";
import { User } from "../../models/User";
import { CameraIcon, UserIcon } from "../Icons";

interface UserValues extends FormikValues{
    image: string,
    name: string
}

export default function UserImageForm(){
    const { editUserImage, getUserById } = useContext(UserContext);
    const { id } = useParams();
    const [ user, setUser ] = useState<User>();
    const imageInput = createRef<HTMLInputElement>()

    const initialValues={
        image: "",
        name: "",
    }

    const [imgState, setImgState] = useState({
        path: "",
    });

    const [imageState, setImageState] = useState({
        image: "",
    });

    const handleGetUser = async () => {
        const { success: response, error } = await getUserById({id: id || ''});

        if(error){
            toast.error(error.message)
            return;
        }

        setUser(response);
        formik.setFieldValue("image", response.image || "");
        formik.setFieldValue("name", response.name || "- -");
    }

    useEffect(() => {
        formik.setFieldValue("image", imageState?.image);
    }, [imageState?.image]);

    useEffect(() => {
        handleGetUser();
    }, []);

    const handleFileChange = async (e: any) => {
        setImageState({
            image: e.target.files[0]
        })
        setImgState({
            ...imgState,
            path: URL.createObjectURL(e.target.files[0])
        })
        await formik.setFieldValue("image", e.target.files[0]);
        
        formik.submitForm();
    }

    const onSubmit = async (values: UserValues, actions: FormikHelpers<UserValues>) => {
        console.log("SUBMIT")
        const token = localStorage.getItem('token');
        const headers = {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${JSON.parse(token || JSON.stringify("TOKEN_MISSING"))}`,
        }

        const { success: response , error} = await editUserImage(id || '', values, headers);

        if(error){
            toast.error(error.message);
        }

        if(response){
            toast.success(response);
        }
    }

    const formik = useFormik({enableReinitialize: true, initialValues, onSubmit, validationSchema: UserEditImageSchema});

    return(
        <FormikProvider value={formik}>
            <UserCustomForm>
                <FormGroupDiv className="ImgContent">
                    <PostImg
                        onClick={e => imageInput.current?.click()}
                    >
                        {user?.image?
                            <img 
                                src={
                                    imgState.path === "" ? 
                                    `http://localhost:5000/images/users/${user.image}`
                                    : imgState.path
                                } alt='UserAvatar'
                            /> :
                            <button disabled>
                                {UserIcon}
                            </button>
                        }
                        <UploadIcon className="absolute">{CameraIcon}</UploadIcon>
                        <input
                            ref={imageInput}
                            type="file"
                            name="image"
                            style={{ display: "none"}}
                            onChange={handleFileChange}
                        />
                    </PostImg>
                    <ErrorMessage component={FormError} name="image"/>
                </FormGroupDiv>

                <FormGroupDiv>
                    <Field
                        name='name'
                        type='text'
                        placeholder='Enter your name'
                        as={CustomInput}
                    />
                    <ErrorMessage component={FormError} name="name"/>
                </FormGroupDiv>
            </UserCustomForm>
        </FormikProvider>
    )
}