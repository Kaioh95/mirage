import { Dispatch, ReactNode, SetStateAction} from "react";
import { CloseButton, ModalContainer, ModalContent } from "./styles";

interface ModalProps{
    hidden: boolean;
    setHidden: Dispatch<SetStateAction<boolean>>;
    children?: ReactNode;
}

function Modal(props: ModalProps){

    return(
        <ModalContainer style={{ display: props.hidden? 'none': 'block'}}>
            <ModalContent>
                <CloseButton onClick={e => props.setHidden(true)}>
                    <span>&times;</span>
                </CloseButton>
                {props.children}
            </ModalContent>
        </ModalContainer>
    )
}

export default Modal;