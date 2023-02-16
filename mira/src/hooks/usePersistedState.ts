import { useEffect, useState, Dispatch, SetStateAction } from "react";

type Response<T> = [
    T,
    Dispatch<SetStateAction<T>>,
]

function usePersistedState<T>(key: string, initialValue: T): Response<T>{
    const [state, setState] = useState(() => {
        const storageValue = localStorage.getItem(key)

        if(storageValue){
            try{
                return JSON.parse(storageValue);
            } catch(e) {
                console.log(e)
            }
        } else {
            return initialValue
        }
    });

    useEffect(() => {
        if(state !== '-1')
            localStorage.setItem(key, JSON.stringify(state));
    },[key, state])

    return [state, setState]
}

export default usePersistedState;