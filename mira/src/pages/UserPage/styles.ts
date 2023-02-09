import styled from "styled-components";
import StarsImg from "../../assets/starsLG.png";

export const MainArea = styled.main`
    width: 100%;
    height: 100vh;
    display: grid;
    overflow-x: hidden;

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

    background-image: url(${StarsImg});
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

    background-color: green;
`;
export const ContentArea = styled.div`
    width: 80%;
    height: 100%;
    
    ${({ theme }) => theme.device.mobile()}{
        width: 100%;
    }
`;