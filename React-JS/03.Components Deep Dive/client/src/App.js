import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoList from "./components/TodoList";
import Loader from "./components/Loader";
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

    const toggleCompletion = (id) => {
        setTodos(oldTodos => oldTodos.map(t => t._id === id ? { ...t, isCompleted: !t.isCompleted } : t))
    }

    const addTodo = async () => {
        const todoText = prompt('Todo text:');
        const todo = {
            text: todoText, isCompleted: false
        }
        try {
            const res = await fetch('http://localhost:3030/jsonstore/todos', {
                method: 'post',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todo)
            })
            const newTodo = await res.json()
            console.log(newTodo)
            setTodos(oldTodos => [newTodo, ...oldTodos])
        } catch (error) {
            console.log(error)
        }
    }
    console.log(todos);

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

export default App;
