import { Form } from "formik";
import styled from "styled-components";

export const CommentCustomForm = styled(Form)`
    width: 100%;
    border: 1px solid grey;
    border-radius: 8px;
    box-sizing: border-box;
    outline: 0;
`;
export const CommentInput = styled.textarea`
    width: 100%;
    min-height: 90px;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 8px 8px 0 0;
    padding-left: 15px;
    padding-top: 15px;

    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.size.medium};
    color: ${({ theme }) => theme.colors.lightText};
    outline: none;
    border: none;

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
export const CommentFormFooter = styled.div`
    padding: 15px;
    display: flex;
    justify-content: end;
`;
export const SendCommentButton = styled.button`
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