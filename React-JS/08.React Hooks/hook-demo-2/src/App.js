import './App.css'

import { useEffect, useReducer } from "react";
const reducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return [...state, action.payload]
    default:
      return state
  }
}
function App() {

  const [people, dispatch] = useReducer(reducer, []);

  useEffect(() => {

  }, [])
  return (
    <div className="App">
      <div style={{ margin: "auto",padding: "15px",border:"1px groove" }}>
      </div>
    </div>
  );
}

export default App;
