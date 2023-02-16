import styled from "styled-components";

export const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    position: fixed;
    right: 50px;
    bottom: 50px;
    border-radius: 50px;
    border: none;
    
    background-color: ${({ theme }) => theme.colors.tertiary};
    color: ${({ theme }) => theme.colors.lightText};
    width: 60px;
    height: 60px;
    cursor: pointer;
    z-index: 1;

    ${({ theme }) => theme.device.mobile()}{
        right: 20px;
        bottom: 20px;
    }

    &>button{
        height: 60%;
        width: 60%;
        border: none;
        background-color: transparent;
        color: ${({ theme }) => theme.colors.lightText};
        cursor: pointer;
    }

    &:hover{
        box-shadow: ${({ theme }) => theme.boxShadow};
        opacity: 0.8;
    }
`