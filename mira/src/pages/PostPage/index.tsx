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
        <ContainerPage>
            <ContainerPost className="Post">Hello World</ContainerPost>
            <ContainerNewPosts className="NewPosts">1000</ContainerNewPosts>
        </ContainerPage>
    )
}

export default PostPage;