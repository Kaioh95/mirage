import { MainContainer, UserContainer, UsersContainer } from "./styles"

import { useContext, useEffect, useState, Fragment } from "react";
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import AddButton from "../../components/AddButton";
import Modal from "../../components/Modal";
import PostForm from "../../components/PostForm";
import { Link, useLocation } from "react-router-dom";
import { User } from "../../models/User";
import { UserContext } from "../../contexts/UserContext";
import { api_url } from "../../constants";
import { UserIcon } from "../../components/Icons";

function UsersPage(){
    const { hiddenPostModal, setHiddenPostModal } = useContext(PostContext);
    const { getAllUsersOrByName } = useContext(UserContext)
    const [users, setUsers] = useState<User[]>();

    const useQuery = () => new URLSearchParams(useLocation().search);
    const query = useQuery();

    const handleGetUsers = async (skip: number, limit: number) => {
        const q = query.get('q')

        const { success: response, error } = await getAllUsersOrByName(q || undefined);

        if(error){
            toast.error(error.message)
            return;
        }

        setUsers(response.users)
    }

    useEffect(() => {
        handleGetUsers(0, 50)
    }, [])

    return(
        <Fragment>
            <Modal hidden={hiddenPostModal} setHidden={setHiddenPostModal}>
                <PostForm/>
            </Modal>
            <AddButton/>
            
            <Header/>
            <UsersContainer>
                <MainContainer>
                    {users?.map((el, index) => (
                        <UserContainer key={index} to={`/user/${el._id}`}>
                            {el.image? 
                                <img src={`${api_url}/images/users/${el.image}`}/> : 
                                <button>{UserIcon}</button>    
                            }
                            <p>
                                {el.name}
                            </p>
                        </UserContainer>
                    ))}
                </MainContainer>
            </UsersContainer>
        </Fragment>
    )
}

export default UsersPage;