import { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";
import { PlusIcon } from "../Icons";
import { ButtonContainer } from "./styles";

function AddButton(){
    const { setHiddenPostModal } = useContext(PostContext);

    return(
        <ButtonContainer onClick={e => setHiddenPostModal(false)}>
            <button>{PlusIcon}</button>
        </ButtonContainer>
    )
}

export default AddButton;