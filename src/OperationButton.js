import React from 'react'
import { ACTIONS } from './App'

function OperationButton({ dispatch, operation}) {
    return (
        <button className="light-grey" onClick={() => dispatch({type: ACTIONS.SELECT_OPERATION , payload: {operation} })}>{operation}</button>
    )
}

export default OperationButton
