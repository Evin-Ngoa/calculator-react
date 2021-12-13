import { useReducer } from 'react';
import './App.css';
import ValueButton from './ValueButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
    ADD_VALUE: 'ADD_VALUE',
    SELECT_OPERATION: 'SELECT_OPERATION',
    DELETE_VALUES: 'DELETE_VALUES',
    CLEAR_SCREEN: 'CLEAR_SCREEN',
    EVALUATE: 'EVALUATE',
}

function reducer(state, { type, payload }){
    switch(type) {
        case ACTIONS.ADD_VALUE:
            // limit zeros
            if(payload.value === "0" && state.currentCalcOperation === "0") return state
            // limit period to one if previous state has period
            if(payload.value === "." && state.currentCalcOperation.includes('.')) return state
            return {
                ...state,
                currentCalcOperation : `${state.currentCalcOperation || ""}${payload.value}`
            }
        case ACTIONS.SELECT_OPERATION:
            return {
                ...state,
                operation: `${payload.operation}`
            }
        case ACTIONS.CLEAR_SCREEN:
            return {}
        default:
            return state
    }
}

function App() {

    const [{ currentCalcOperation, previousCalcOperation, operation }, dispatch] = useReducer(reducer, {});

    // dispatch({type: ACTIONS.ADD_VALUE, payload: {value: 1}})

    return (
        <div className="calculator-grid-container">
            <div className="results">
                <div className="top-view">{previousCalcOperation} {operation}</div>
                <div className="bottom-view">{currentCalcOperation}</div>
            </div>

            {/* <ValueButton value="AC" dispatch={dispatch}/> */}
            <button className="dark-red col-span-two" onClick={() => dispatch({type: ACTIONS.CLEAR_SCREEN})}>AC</button>
            <OperationButton operation="/" dispatch={dispatch}/>
            <OperationButton operation="x" dispatch={dispatch}/>
            <ValueButton value="7" dispatch={dispatch}/>
            <ValueButton value="8" dispatch={dispatch}/>
            <ValueButton value="9" dispatch={dispatch}/>
            <OperationButton operation="-" dispatch={dispatch}/>
            <ValueButton value="4" dispatch={dispatch}/>
            <ValueButton value="5" dispatch={dispatch}/>
            <ValueButton value="6" dispatch={dispatch}/>
            <OperationButton operation="+" dispatch={dispatch}/>
            <ValueButton value="1" dispatch={dispatch}/>
            <ValueButton value="2" dispatch={dispatch}/>
            <ValueButton value="3" dispatch={dispatch}/>
            <button className="dark-blue row-span-two">=</button>
            <ValueButton value="0" dispatch={dispatch}/>
            <ValueButton value="." dispatch={dispatch}/>

        </div>
    );
}

export default App;
