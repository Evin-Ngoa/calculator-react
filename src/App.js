import { useReducer } from 'react';
import './App.css';
import ValueButton from './ValueButton';

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
            return {
                ...state,
                currentCalcOperation : `${state.currentCalcOperation || ""}${payload.value}`
            }
        default:
            return state
    }
}

function App() {

    const [{ currentCalcOperation, previousCalcOperation, operation }, dispatch] = useReducer(reducer, {});

    // dispatch({type: ACTIONS.ADD_VALUE, payload: {value: 1}})

    return (
        <div className="calculator-grid-container">
            {/* output */}
            <div className="results">
                {/* previous-operand */}
                <div className="top-view">{previousCalcOperation} {operation}</div>
                {/* current-operand */}
                <div className="bottom-view">{currentCalcOperation}6</div>
            </div>

            <button className="dark-red col-span-two">AC</button>
            <button className="light-grey">/</button>
            <button className="light-grey">x</button>
            {/* <button>7</button> */}
            <ValueButton value="7" dispatch={dispatch}/>
            <button>8</button>
            <button>9</button>
            <button className="light-grey">-</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button className="light-grey">+</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button className="dark-blue row-span-two">=</button>
            <button className="col-span-two">0</button>
            <button>.</button>

        </div>
    );
}

export default App;
