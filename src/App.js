import { useReducer } from 'react';
import './App.css';
import ValueButton from './ValueButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
    ADD_VALUE: 'ADD_VALUE',
    SELECT_OPERATION: 'SELECT_OPERATION',
    DELETE_VALUES: 'DELETE_VALUES',
    CLEAR_SCREEN: 'CLEAR_SCREEN',
    CALCULATE: 'CALCULATE',
}

function reducer(state, { type, payload }){
    switch(type) {
        case ACTIONS.ADD_VALUE:

            // check if caluclation has been made then start new value and not append
            if(state.overwriteBottomView){
                return {
                    ...state,
                    currentCalcOperation: payload.value,
                    overwriteBottomView: false,
                }
            }
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

                // if prev is not set and current == - then use prev operation
                // 5 + -8 [use +. prev operation and update - to currentCalOp]
                if(state.operation  !== null && payload.operation === '-'){
                    return {
                        ...state,
                        operation: state.operation,
                        currentCalcOperation: payload.operation
                    }

                }

                return {
                    ...state,
                    operation: payload.operation
                }

            }

            // Since I had set current state to -ve, then on 3rd operator
            // if the previous was -ve, make current payload operation 
            // and remove the -ve  by setting null 
            if(state.currentCalcOperation === '-'){
                return {
                    ...state,
                    operation: payload.operation,
                    currentCalcOperation: null
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
            return {
                currentCalcOperation: 0
            }

        case ACTIONS.CALCULATE:
            // if nothing has been supplied return current state
            if(
                state.operation == null ||
                state.currentCalcOperation == null ||
                state.previousCalcOperation == null 
            ){
                return state
            }

            return {
                ...state,
                overwriteBottomView: true,
                previousCalcOperation: null,
                operation: null,
                currentCalcOperation: calculate(state)
            }

        default:
            return state
    }
}

function calculate({ currentCalcOperation, previousCalcOperation, operation }){
    const initial = parseFloat(previousCalcOperation)
    const current = parseFloat(currentCalcOperation)
    let results = '';

    // if gets -ve then return the prev value to be calculated
    if(currentCalcOperation === '-') {
        return previousCalcOperation.toString();
    }

    // error checking of passed values
    if(isNaN(initial) || isNaN(current)) return ""

    switch(operation){
        case "+":
            results = initial + current
            break
        case "-":
            results = initial - current
            break
        case "x":
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
            <button className="dark-blue row-span-two" onClick={() => dispatch({ type: ACTIONS.CALCULATE })}>=</button>
            <ValueButton value="0" dispatch={dispatch}/>
            <ValueButton value="." dispatch={dispatch}/>

        </div>
    );
}

export default App;
