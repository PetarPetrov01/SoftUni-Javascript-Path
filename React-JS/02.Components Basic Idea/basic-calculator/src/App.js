import { useState } from 'react';
import './App.css';
import Calculator from './components/Calculator';
import { Instructions } from './components/Instructions';
import List from './components/List';

function App() {

    const [expanded, setExpanded] = useState(false);

    function toggleInstruction(e) {
        e.preventDefault();
        setExpanded(state => !state);
    }

    return (
        <div className="App">
            <h1 className='title'>React ugly basic calculator</h1>
            {expanded ? <Instructions expanded={expanded} /> : null}
            <button className='instructionBtn' onClick={toggleInstruction}>
                {expanded ? 'X':'Show instuctions'}
            </button>
            <List />
        </div>
    );
}

export default App;
