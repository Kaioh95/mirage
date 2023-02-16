import styled from "styled-components";
import StarsImg from "../../assets/starsLG.png";

export const MainArea = styled.main`
    width: 100%;
    height: 100vh;
    display: grid;

    grid-template-columns: 1fr;
    grid-template-rows: 200px 1fr;
    grid-template-areas:
        "UserInfo"
        "Content";
`;
export const UserAreaContainer = styled.div`
    display: flex;
    justify-content: center;

    width: 100%;
    height: 100%;


    background-image: 
        linear-gradient(
            0deg,
            transparent 0%,
            ${({ theme }) => theme.colors.tertiary} 100%),
        url(${StarsImg});
    background-position: 50% 0;
    background-size: cover;
`;
export const UserArea = styled.div`
    width: 80%;
    height: 100%;
    
    ${({ theme }) => theme.device.mobile()}{
        width: 100%;
    }
`;
export const ContentAreaContainer = styled.div`
    display: flex;
    justify-content: center;
    
    height: 100%;
    width: 100%;
`;
export const ContentArea = styled.div`
    width: 80%;
    height: 100%;
    
    ${({ theme }) => theme.device.mobile()}{
        width: 100%;
    }
`;
export const PostWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;