import styled from "styled-components";

export const Loader = styled.div`
    position: relative;
    top: 50%;
    left: 50%;
    translate: -50% -50%;

    margin: 10px;
    border: 12px solid ${({ theme }) => theme.colors.secondary};
    border-radius: 50%;
    border-top: 12px solid ${({ theme }) => theme.colors.tertiary};
    width: 150px;
    height: 150px;
    min-width: 150px;
    min-height: 150px;
    animation: spinner 1.5s ease-in-out infinite;
  
    @keyframes spinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`