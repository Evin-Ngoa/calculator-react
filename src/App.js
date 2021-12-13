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

            // limit period to one if current state has period
            if(payload.value === "." && state.currentCalcOperation.includes('.')) return state

            return {
                ...state,
                currentCalcOperation : `${state.currentCalcOperation || ""}${payload.value}`
            }

        case ACTIONS.SELECT_OPERATION:
            // operation should not be selected if no digit has been aded
            if(state.currentCalcOperation == null && state.previousCalcOperation == null) return state

            // make current value and operation be previous(top-view) if operation has been selected and set currentState to empty so that 2nd operand part is added
            // if this has been executed then we know current has a value
            if(state.previousCalcOperation == null){
                return {
                    ...state,
                    operation: payload.operation,
                    previousCalcOperation: state.currentCalcOperation,
                    currentCalcOperation: null
                }
            }

            // check if operations are selected continuously then overite the operations only
            if(state.currentCalcOperation == null){
                return {
                    ...state,
                    operation: payload.operation
                }

            }

            // nesting operations, make evaluation of current expression, make current be previous and append operand, make current to null

            return {
                ...state,
                previousCalcOperation: calculate(state),
                operation: payload.operation,
                currentCalcOperation: null
            }

        case ACTIONS.CLEAR_SCREEN:
            // return empty state 
            return {}

        default:
            return state
    }
}

function calculate({ currentCalcOperation, previousCalcOperation, operation }){
    const initial = parseFloat(previousCalcOperation)
    const current = parseFloat(currentCalcOperation)
    let results = '';

    // error checking of passed values
    if(isNaN(initial) || isNaN(current)) return ""

    switch(operation){
        case "+":
            results = initial + current
            break
        case "-":
            results = initial - current
            break
        case "*":
            results = initial * current
            break
        case "/":
            results = initial / current
            break
        default:
            results = ''
            break

    }

    return results.toString()


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
