import { createContext } from "react";
import { useReducer } from "react";
import Reducer from "./redeucerfornewlist";


export let context = createContext([]);


export const Contextprovider=({children})=>{
    const [todos,dispatch]=useReducer(Reducer,[])
    return(
        <context.Provider value={{ todos, dispatch }}>
            {children}
        </context.Provider>
    )
}