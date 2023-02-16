import { Form } from "formik";
import styled from "styled-components";

export const PostCustomForm = styled(Form)`
    display: flex;
    flex-direction: row;
    width: 100%;
    border-radius: 4px;
    box-sizing: border-box;
    outline: 0;

    ${({theme}) => theme.device.tablet()}{
        display: block;
    }
`;
export const FormGroupDiv = styled.div`
    width: 50%;
    margin: 0 10px;

    ${({theme}) => theme.device.tablet()}{
        width: 95%;
    }

    &.ImgContent{
        border-right: 1px solid #888;
        padding: 0 5px;

        ${({theme}) => theme.device.tablet()}{
            border: none;
            border-bottom: 1px solid #888;
        }
    }
`;
export const PostImg = styled.img`
    height: 70%;
    width: 100%;

    ${({theme}) => theme.device.tablet()}{
        height: 100%;
        width: 95%;
    }
`;
export const CustomLabel = styled.label`
    color: ${({ theme }) => theme.colors.lightText};
`;
export const CustomInput = styled.input`
    width: 100%;
    line-height: 35px;
    padding-left: 15px;
    margin: 10px 0;

    border-radius: ${({ theme }) => theme.borderRadius.card};
    background: ${({ theme }) => theme.colors.menuItem};
    color: ${({ theme }) => theme.colors.lightText};
    
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

    ${({theme}) => theme.device.tablet()}{
        background: hsla(0,0%,100%,.25);
    }
`;
export const PostFormFooter = styled.div`
    padding: 5px 15px;
    display: flex;
    justify-content: end;
`;
export const CreatePostButton = styled.button`
    background-color: ${({ theme }) => theme.colors.primary};
    font-size: ${({ theme }) => theme.font.size.medium};
    border-radius: ${({ theme }) => theme.borderRadius.button};
    color: ${({ theme }) => theme.colors.lightText};
    border: none;
    height: 35px;
    min-width: 100px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover{
        background-color: ${({ theme }) => theme.colors.tertiary};
    }

    &.disabled{
        opacity: 0.4;
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