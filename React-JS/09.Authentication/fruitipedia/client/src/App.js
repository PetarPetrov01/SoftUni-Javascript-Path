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
import { Details } from "./components/Details/Details";
import { Edit } from "./components/Edit/Edit";
import { Search } from "./components/Search/Search";
import { RouteGuard } from "./components/RouteGuards/RouteGard";

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


    return (
        <div className="App">
            <UserProvider>
                <FruitsProvider>
                </FruitsProvider>
            </UserProvider >
        </div >
    );
}

export default App;
