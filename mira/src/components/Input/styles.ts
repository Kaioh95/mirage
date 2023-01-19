import styled from "styled-components";

export const CustomInput = styled.input`
    width: 100%;
    line-height: 35px;
    padding-left: 15px;
    margin: 10px 0;

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