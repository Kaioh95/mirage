import styled from "styled-components";

export const Container = styled.header`
    height: 60px;
    padding: 0 30px;
    
    background: ${({ theme }) => theme.colors.tertiary};
    color: ${({ theme }) => theme.colors.lightText};
    box-shadow: ${({ theme }) => theme.headerShadow};

    display: flex;
    align-items: center;
    justify-content: space-between;
`;