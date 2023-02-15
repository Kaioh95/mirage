import { Loader } from "./styles"

interface LoadingRingProps{
    hide?: boolean
}

export default function LoadingRing(props: LoadingRingProps){

    return(
        <Loader style={{ display: props.hide? 'block' : 'none'}}/>
    )
}