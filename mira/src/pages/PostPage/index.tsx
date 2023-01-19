import { Fragment } from "react";
import Header from "../../components/Header";
import { ContainerPage, ContainerPost, ContainerNewPosts} from "./styles";

interface PostPageProps{
    id?: string;
    src?: string;
    title?: string;
    likes?: number;
    comments?: number;
    views?: number;
    width?: string; 
}

function PostPage(props: PostPageProps){

    return(
        <Fragment>
            <Header/>
            <ContainerPage>
                <ContainerPost className="Post">Hello World</ContainerPost>
                <ContainerNewPosts className="NewPosts">1000</ContainerNewPosts>
            </ContainerPage>
        </Fragment>
    )
}

export default PostPage;