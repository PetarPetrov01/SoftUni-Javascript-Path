import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import * as fruitService from './services/fruitService';
import { UserProvider } from "./contexts/UserContext";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./components/Home/Home";
import { Catalog } from "./components/Catalog/Catalog";
import { Register } from "./components/Register/Register";
import { Login } from "./components/Login/Login";
import { Create } from "./components/Create/Create";
import { Edit } from "./components/Edit/Edit";
function App() {
    const navigate = useNavigate();
    const [fruits, setFruits] = useState();

    useEffect(() => {
        fruitService.getAll()
            .then(result => {
                setFruits(result);
            })
            .catch(er => alert(er));
    }, []);

    const onCreateHandler = async (e, fruit) => {
        e.preventDefault();
        try {
            if (Object.values(fruit).some(v => v === '')) {
                throw new Error('All inputs must be filled!');
            }
            const newFruit = await fruitService.create(fruit);
            setFruits(fruits => [...fruits, newFruit]);
            navigate('/catalog');
        } catch (error) {
            alert(error);
        }
    };

    const onEditHanlder = async (e, id, editedFruit) => {
        e.preventDefault();
        try {
            await fruitService.edit(id, editedFruit);
            setFruits(fruits => fruits.map(f => f._id === id ? editedFruit : f));
            navigate(`/catalog/${id}`);
        } catch (error) {
            alert(error);
        }
    };


    return (
        <div className="App">
            <UserProvider>

                <div id="wrapper">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/catalog" element={<Catalog fruits={fruits} />}></Route>
                            <Route path="/create" element={<RouteGuard />}>
                                <Route path="/create" element={<Create onCreateHandler={onCreateHandler} />}></Route>
                            </Route>
                            <Route path="/register" element={<Register />}></Route>
                            <Route path="/login" element={<Login />}></Route>
                        </Routes>
                    </main>
                </div>
                <Footer />
            </UserProvider >
        </div >
    );
}

export default App;
