import { Link } from "react-router-dom";
import styled from "styled-components";
import BgImg from '../../assets/bodyback.png'

export const LoginRegisterContainer = styled.div`
    background-image: url(${BgImg});
    background-size: cover;

    display: flex;
    justify-content: center;
    align-items: center;

    height: 100vh;
    width: 100vw;
`;
export const FormCard = styled.div`
    width: 300px;
    height: fit-content;
    padding: 20px;

    background-color: ${({ theme }) => theme.colors.tertiary};
    border-radius: ${({ theme }) => theme.borderRadius.card};
`;
export const ImgLink = styled(Link)`
    position: relative;
    left: 20%;

    &>img{
        width: 150px;
        display: block;
    }
`
export const LogoImg = styled.img`
    width: 150px;
    display: block;

    ${({theme}) => theme.device.tablet()}{
        width: 80px;
    }
`;
export const InputIconContainer = styled.div`
    position: relative;
    margin: 15px 0;
`;

export const CustomInput = styled.input`
    width: 100%;
    line-height: 35px;
    padding-left: 15px;

    border-radius: ${({ theme }) => theme.borderRadius.card};
    background-color: ${({ theme }) => theme.colors.secondary};
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
export const InputIcon = styled.button`
    width: 25px;
    height: 35px;
    margin: 0 8px;

    top: 0;
    right: 0;
    position: absolute;
    
    display: flex;
    align-items: center;
    background-color: transparent;
    border: 0;
    
    color: ${({ theme }) => theme.colors.lightText};
`;
export const FormFooter = styled.div`

`;
export const Button = styled.button`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.lightText};
    font-size: ${({ theme }) => theme.font.size.large};

    border: 2px solid ${({ theme }) => theme.colors.lightText};
    border-radius: ${({ theme }) => theme.borderRadius.button};
    box-shadow: ${({ theme }) => theme.boxShadow};

    line-height: 30px;
    padding: 0 12px;
    cursor: pointer;

    transition: all 0.3s;
    float: right;

    &.disabled{
        opacity: 0.4;
    }

    &:hover{
        background-color: ${({ theme }) => theme.colors.primary};
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