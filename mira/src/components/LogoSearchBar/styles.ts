import styled from "styled-components";
import { Form } from "formik";

export const LogoArea = styled.div`
    margin-right: 10px;
    width: 200px;
    display: inline-flex;
    align-items: center;

    ${({theme}) => theme.device.tablet()}{
        width: fit-content;
    }
`;
export const LogoImg = styled.img`
    width: 150px;
    display: block;

    ${({theme}) => theme.device.tablet()}{
        width: 80px;
    }
`
export const SearchContainer = styled.nav`
    width: 500px;
    display: flex;

    ${({theme}) => theme.device.tablet()}{
        position: absolute;
        top: 50px;
        left: 30px;
        padding: 15px;
        width: 250px;

        background-color: #53565d;
        border-radius: 4px;

        &.drop{
            display: flex;
        }

        &.collapse{
            display: none;
        }
    }
`
export const DropButton = styled.button`
    width: 18px;
    height: 18px;
    margin-left: 5px;

    display: none;
    border: 0;

    background: transparent;
    color: ${({ theme }) => theme.colors.lightText};

    &:hover {
        opacity: 0.6;
    }

    ${({theme}) => theme.device.tablet()}{
        display: block;
    }
`;
export const SearchForm = styled(Form)`
    width: 100%;
    position: relative;

    color: ${({ theme }) => theme.colors.lightText};
`;
export const SearchInput = styled.input`
    width: 100%;
    line-height: 35px;
    padding-left: 15px;

    border-radius: ${({ theme }) => theme.borderRadius.searchBar};
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
export const SearchButton = styled.button`
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
    border-radius: ${({ theme }) => theme.borderRadius.searchBar};
    cursor: pointer;
`;