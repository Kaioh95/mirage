import { Link } from "react-router-dom";
import styled from "styled-components";

export const CommentContent = styled.div`
    padding: 5px 8px;
    margin-bottom: 10px;
    border-radius: ${({ theme }) => theme.borderRadius.card};
    
    &:hover{
        background-color: ${({ theme }) => theme.colors.secondary};
    }

    &::after{
        content: "";
        display: block;
        position: relative;
        height: 1px;
        width: 100%;
        bottom: -11px;
        border-bottom: 1px solid #808080;
    }

    &>button{
        float: right;
        width: 18px;
        margin: 0 4px;

        border: none;
        background-color: transparent;
        color: ${({ theme }) => theme.colors.text};

        &:hover{
            opacity: 0.3;
        }
    }
`;
export const CommentHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    &>span{
        font-size: ${({ theme }) => theme.font.size.small};
        font-weight: ${({ theme }) => theme.font.weight.semiBold};
        color: ${({ theme }) => theme.colors.text};
        opacity: 0.6;
    }
`;
export const CommentOwner = styled(Link)`
    font-size: ${({ theme }) => theme.font.size.small};
    font-weight: ${({ theme }) => theme.font.weight.semiBold};
    color: ${({ theme }) => theme.colors.text};
    margin-right: 4px;

    text-decoration: none;
    display: inline-block;
    cursor: pointer;

    &>img {
        display: block;
        height: 25px;
        width: 25px;
        border-radius: ${({ theme }) => theme.borderRadius.addButton};
    }

    &>svg{
        display: block;
        height: 25px;
        width: 25px;
        border-radius: ${({ theme }) => theme.borderRadius.addButton};
    }
`;
export const CommentBody = styled.div`
    &>span{
        font-size: ${({ theme }) => theme.font.size.large};
        font-weight: ${({ theme }) => theme.font.weight.medium};
        color: ${({ theme }) => theme.colors.text};
    }
`;