import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
    const [todos, setTodos] = useState([])
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        async function getData() {
            try {
                const res = await fetch('http://localhost:3030/jsonstore/todos')
                const data = await res.json();
                setTodos(Object.values(data));
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])
    return (
        <div className="App">

            <Header />

            <main className="main">
                <section className="todo-list-container">
                    <h1>Todo List</h1>

                    <div className="add-btn-container">
                        <button className="btn" onClick={addTodo}>+ Add new Todo</button>
                    </div>
                    <div className="table-wrapper">
                        {isLoading
                            ? <Loader />
                            : <TodoList todos={todos} toggleCompletion={toggleCompletion} />}
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
