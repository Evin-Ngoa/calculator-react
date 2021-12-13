import React from 'react'
import { ACTIONS } from './App'

function ValueButton({ dispatch, value}) {
    return (
        <button className={ value === '0' ? 'col-span-two' : '' } onClick={() => dispatch({type: ACTIONS.ADD_VALUE , payload: {value} })}>{value}</button>
    )
}

export default ValueButton
