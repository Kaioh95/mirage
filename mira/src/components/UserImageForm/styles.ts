import styled from "styled-components";
import {Form} from "formik";

export const UserCustomForm = styled(Form)`
    background-color: transparent;
    height: 100%;
    width: 100%;

    display: flex;
    align-items: center;
`;
export const FormGroupDiv = styled.div`
    margin-right: 10px;
`;
export const PostImg = styled.div`
    position: relative;
    height: 80px;
    width: 80px;

    &>img,button{
        display: block;
        min-height: 80px;
        min-width: 80px;
        height: 80px;
        width: 80px;
        border-radius: 50%;

        border: none;
        background-color: transparent;
        color: ${({ theme }) => theme.colors.lightText};
    }

    &:hover{
        &>div.absolute{
            display: flex;
        }
    }
`;
export const UploadIcon = styled.div`
    display: none;
    position: absolute;
    justify-content: center;
    align-items: center;
    
    top: 0px;
    left: 0px;
    height: 80px;
    width: 80px;
    
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    color: ${({ theme }) => theme.colors.lightText};

    &>svg{
        display: block;
        width: 50px;
        height: 50px;
    }
`;
export const CustomInput = styled.input`
    width: 100%;
    line-height: 35px;
    padding-left: 15px;
    margin: 10px 0;

    border-radius: ${({ theme }) => theme.borderRadius.card};
    background: transparent;
    color: ${({ theme }) => theme.colors.lightText};
    font-size: ${({ theme }) => theme.font.size.xLarge};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    
    outline: none;
    border: 0;

    // Prevent Autofill color changing
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
        -webkit-transition-delay: 9999s;
    }

    &:focus {
        opacity: 0.85;
        outline: none;
        border: 0;

        color: ${({ theme }) => theme.colors.lightText};
    }
    &::placeholder {
        color: ${({ theme }) => theme.colors.lightText};
        opacity: 0.8;
    }
`;
export const FormError = styled.div`
    font-style: italic;
    font-size: 10pt;
    color: red;
    margin: 0px;
    height: 13pt;

    &.hidden{
        visibility: hidden;
    }
    &.visible{
        visibility: visible;
    }
`;