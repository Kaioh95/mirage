import { useContext } from "react";
import AddButton from "../../components/AddButton";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import PostForm from "../../components/PostForm";
import UserImageForm from "../../components/UserImageForm";
import { PostContext } from "../../contexts/PostContext";
import { ContentArea, ContentAreaContainer, MainArea, UserArea, UserAreaContainer } from "./styles";

export default function UserPage(){
    const { hiddenPostModal, setHiddenPostModal } = useContext(PostContext)

    return(
        <div>
            <Modal hidden={hiddenPostModal} setHidden={setHiddenPostModal}>
                <PostForm/>
            </Modal>
            <AddButton/>
            <Header/>
            <MainArea>
                <UserAreaContainer className="UserInfo">
                    <UserArea>
                        <UserImageForm/>
                    </UserArea>
                </UserAreaContainer>
                <ContentAreaContainer className="Content">
                    <ContentArea>
                        Content
                    </ContentArea>
                </ContentAreaContainer>
            </MainArea>
        </div>
    )
}