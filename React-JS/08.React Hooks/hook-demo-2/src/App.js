import './App.css'

import { useEffect, useReducer } from "react";
import { CreateForm } from "./components/createForm";
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

  const onSubmitHandler = (e, values) => {
    e.preventDefault();
    dispatch({ type: 'add', payload: values })
  }

  return (
    <div className="App">
      <CreateForm onSubmitHandler={onSubmitHandler} />
      <div style={{ margin: "auto",padding: "15px",border:"1px groove" }}>
      </div>
    </div>
  );
}

export default App;
