import styled from "styled-components";
import HeaderBackImg from '../../assets/headerback.png'

export const Container = styled.header`
    height: 60px;
    padding: 0 30px;
    
    background-color: ${({ theme }) => theme.colors.tertiary};
    background: url(${HeaderBackImg}) no-repeat ${({ theme }) => theme.colors.tertiary};
    background-size: cover;
    color: ${({ theme }) => theme.colors.lightText};
    box-shadow: ${({ theme }) => theme.headerShadow};

    display: flex;
    align-items: center;
    justify-content: space-between;
`;