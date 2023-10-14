import './App.css'

import { useEffect, useReducer } from "react";
import { CreateForm } from "./components/createForm";
import { Row } from "./components/Row";

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
        {people.map(p => <Row key={p._id} {...p} />)}
      </div>
    </div>
  );
}

export default App;
