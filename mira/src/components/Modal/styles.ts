import styled from "styled-components";

export const ModalContainer = styled.div`
    z-index: 3;
    display: none;
    padding-top: 100px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.5);
`;
export const ModalContent = styled.div`
    display: flex;
    width: 600px;
    position: relative;
    margin: 10% auto;
    padding: 15px 20px;
    color: ${({ theme }) => theme.colors.lightText};
    background-color: ${({ theme }) => theme.colors.menu};
    box-shadow: 9px 9px 20px rgb(255 255 255 / 21%);
    border-radius: ${({ theme }) => theme.borderRadius.card};

    ${({ theme }) => theme.device.tablet()}{
        width: 80%;
    }
`;
export const CloseButton = styled.div`
    cursor: pointer;
    position: absolute;
    bottom: 0;
    right: 10px;
    top: 0px;
    font-size: 30px;
    color: ${({ theme }) => theme.colors.lightText};
    width: 15px;
    height: 15px;
`;

