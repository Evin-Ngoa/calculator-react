import React from 'react'
import { ACTIONS } from './App'

function ValueButton({ dispatch, value}) {
    return (
        <button onClick={() => dispatch({type: ACTIONS.ADD_VALUE , payload: {value} })}>{value}</button>
    )
}

export default ValueButton
