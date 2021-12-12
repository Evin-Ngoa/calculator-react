import './App.css';

function App() {
  return (
    <div className="calculator-grid-container">
        {/* output */}
        <div className="results">
            {/* previous-operand */}
            <div className="top-view">45</div>
            {/* current-operand */}
            <div className="bottom-view">45</div>
        </div>

        <button className="dark-red col-span-two">AC</button>
        <button className="light-grey">/</button>
        <button className="light-grey">x</button>
        <button>7</button>
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
