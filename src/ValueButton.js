import React from 'react'
import { ACTIONS } from './App'

function ValueButton({ dispatch, value}) {

    function ButtonTemplate(className){
        return (
            <button className={className} onClick={() => dispatch({type: ACTIONS.ADD_VALUE , payload: {value} })}>{value}</button>
            )
    }
    
    switch(value){
        case "0":
           return ButtonTemplate("col-span-two")

        // case "AC":
        //    return ButtonTemplate("dark-red col-span-two")

        default:
            return ButtonTemplate("")
    }

}

export default ValueButton
