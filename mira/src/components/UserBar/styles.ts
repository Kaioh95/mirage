import styled from "styled-components";
import starsImg from '../../assets/starsSM.png'

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const UserArea = styled.nav`
    min-width: 250px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    ${({theme}) => theme.device.tablet()}{
        display: none;
        flex-direction: column;
        justify-content: space-between;

        height: 150px;
        background-color: ${({ theme }) => theme.colors.menu};
        border-radius: 4px;

        position: absolute;
        top: 65px;
        right: 30px;
        padding: 15px;

        &.drop{
            display: flex;
        }

        &.collapse{
            display: none;
        }
    }
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

    &:hover{
        background-color: ${({ theme }) => theme.colors.primary};
    }
`;

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
export const LoggedUserArea = styled.nav`
    min-width: 250px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    ${({theme}) => theme.device.mobile()}{
        min-width: 130px;
        max-width: 130px;
    }
`
export const AvatarSpan = styled.span`
    height: 40px;
    width: 40px;
    margin-left: 15px;

    text-decoration: none;
    border-radius: ${({ theme }) => theme.borderRadius.addButton};
    background-size: cover;
    cursor: pointer;
`;
export const UserMenu = styled.menu`
    background-color: ${({ theme }) => theme.colors.menu};
    border-radius: 4px;
    display: none;

    flex-direction: column;
    justify-content: space-between;
    
    position: absolute;
    top: 65px;
    right: 25px;
    width: 250px;
    overflow: hidden;

    &.active {
        display: flex;
    }
`
export const AvatarA = styled.a`
    min-height: 40px;
    min-width: 40px;
    margin: 10px;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;

    &>img {
        display: block;
        height: 40px;
        width: 40px;
        border-radius: ${({ theme }) => theme.borderRadius.addButton};
    }
`
export const UserCard = styled.div`
    width: 100%;
    height: 100px;
    display: block;
    text-align: center;

    background-image: 
        url(${starsImg});

    &>div{
        padding-left: 15px;
        padding-top: 5px;
        height: 30px;
        overflow: hidden;

        text-align: start;
        font-size: ${({ theme }) => theme.font.size.large};
        font-weight: ${({ theme }) => theme.font.weight.bold};
        color: ${({ theme }) => theme.colors.lightText};
    }

    animation: slide 50s linear infinite;
    will-change: background-position;

    @keyframes slide {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: 0 4000px;
        }
    }
`;
export const MenuList = styled.div`
    padding: 5px 0;

    &>a {
        display: block;
        text-decoration: none;
        color: ${({ theme }) => theme.colors.lightText};
        font-size: ${({ theme }) => theme.font.size.medium};
        font-weight: ${({ theme }) => theme.font.weight.semiBold};

        width: auto;
        line-height: 2.14;
        text-align: start;
        padding-left: 25px;
        cursor: pointer;

        &:hover {
            background-color: ${({ theme }) => theme.colors.menuLight};
        }
    }
`;
export const UserMenuFooter = styled.div`
    display: flex;
    justify-content: flex-end;
    background-color: #565f6e;
    padding: 10px 5px;
`;
export const FooterButton = styled.div`
    width: 50%;
    padding: 5px;
    border: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background: transparent;
    color: ${({ theme }) => theme.colors.lightText};
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.colors.menuLight};
    }

    &>button{
        width: 20px;
        height: 20px;
        margin-right: 5px;
        background: transparent;
        border: 0;

        font-size: ${({ theme }) => theme.font.size.medium};
        font-weight: ${({ theme }) => theme.font.weight.bold};
        color: ${({ theme }) => theme.colors.lightText};
    }
`