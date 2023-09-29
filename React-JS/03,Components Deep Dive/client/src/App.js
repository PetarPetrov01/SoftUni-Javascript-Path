import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
    return (
        <div className="App">

            <Header />

            <main className="main">
                <section className="todo-list-container">
                    <h1>Todo List</h1>

                    <div className="add-btn-container">
                        <button className="btn" onClick={addTodo}>+ Add new Todo</button>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
