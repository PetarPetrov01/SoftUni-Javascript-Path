import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import * as fruitService from './services/fruitService';

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Home } from "./components/Home/Home";
import { Catalog } from "./components/Catalog/Catalog";
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

                <div id="wrapper">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/catalog" element={<Catalog fruits={fruits} />}></Route>
                        </Routes>
                    </main>
                </div>
                <Footer />
            </UserProvider >
        </div >
    );
}

export default App;
