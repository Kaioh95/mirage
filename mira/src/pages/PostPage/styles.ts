import styled from "styled-components";

export const ContainerPage = styled.main`
    width: 80%;
    height: 100vh;
    display: grid;

    grid-template-columns: 1fr 300px;
    grid-template-rows: 1fr;
    grid-template-areas: "Post NewPosts";

    ${({ theme }) => theme.device.tablet()}{
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 500px;
        grid-template-areas: 
            "Post"
            "NewPosts";
    }
`

export const ContainerPost = styled.div`

    &.Post{
        grid-area: Post;
    }
`

export const ContainerNewPosts = styled.div`

    &.NewPosts{
        grid-area: NewPosts;
    }
`