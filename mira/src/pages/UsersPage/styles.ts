import { Link } from "react-router-dom";
import styled from "styled-components";

export const UsersContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
`;
export const MainContainer = styled.main`
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: center;

    width: 80%;
    padding: 40px 0px;

    ${({ theme }) => theme.device.tablet()}{
        width: 100%;
    };
`;
export const UserContainer = styled(Link)`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    
    width: 80%;
    height: 80px;
    margin: 20px 0;
    padding: 10px;

    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.lightText};
    border-radius: ${({ theme }) => theme.borderRadius.card};

    font-family: ${({ theme }) => theme.font.family};
    font-size: ${({ theme }) => theme.font.size.large};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    text-decoration: none;

    &>img,button{
        display: block;
        width: 60px;
        height: 60px;
        margin: 0 40px;
        border-radius: 50%;
        background-color: transparent;
        border: none;
        color: ${({ theme }) => theme.colors.lightText};
    }

    :hover{
        background-color: ${({ theme }) => theme.colors.tertiary};
    }
`;