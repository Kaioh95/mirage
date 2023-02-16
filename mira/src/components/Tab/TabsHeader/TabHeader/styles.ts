import styled from "styled-components"

export const TabA = styled.a`
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
`;
export const TabLi = styled.li`
    margin-right: 15px;
    font-size: ${({ theme }) => theme.font.size.large};
    font-weight: ${({ theme }) => theme.font.weight.medium};
    font-family: ${({ theme }) => theme.font.family};
    border: none;

    &:hover{
        & a{
            opacity: 0.5;
        }
    }

    &.active{
        font-weight: ${({ theme }) => theme.font.weight.bold};
        border-bottom: 3px solid ${({ theme }) => theme.colors.text};
    }
`;