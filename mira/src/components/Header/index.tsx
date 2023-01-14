import React from "react";
import LogoSearchBar from "../LogoSearchBar";
import UserBar from "../UserBar";
import { Container } from "./styles";

const Header: React.FC = () =>{

    return(
        <Container>
            <LogoSearchBar/>
            <UserBar/>
        </Container>
    )
}

export default Header