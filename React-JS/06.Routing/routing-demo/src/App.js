import './App.css';
import { Route, Routes } from 'react-router-dom';
import { NotFound } from './components/NotFound';
import { MainNav } from './components/MainNav';
function App() {
    return (
        <div className="App">
            <header className="App-header">
                <MainNav />

            </header>
            <Routes>
                <Route path='/' element={<h1>Home page</h1>}></Route>
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
        </div>
    );
}

export default App;
