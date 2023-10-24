import { Route, Routes } from "react-router-dom";

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
import { FruitsProvider } from "./contexts/FruitsContext";
import { RouteOwnerGuard } from "./components/RouteGuards/RouteOwnerGuard";

function App() {

    return (
        <div className="App">
            <UserProvider>
                <FruitsProvider>
                    <div id="wrapper">
                        <Header />
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />}></Route>
                                <Route path="/catalog" element={<Catalog />}></Route>
                                <Route path="/catalog/:id" element={<Details />}></Route>
                                <Route element={<RouteGuard />}>
                                    <Route path="/create" element={<Create />}></Route>
                                    <Route path="/search" element={<Search />}></Route>

                                    <Route element={<RouteOwnerGuard />}>
                                        <Route path="/catalog/:id/edit" element={<Edit />}></Route>
                                    </Route>
                                </Route>
                                <Route path="/register" element={<Register />}></Route>
                                <Route path="/login" element={<Login />}></Route>
                            </Routes>
                        </main>
                    </div>
                    <Footer />
                </FruitsProvider>
            </UserProvider >
        </div >
    );
}

export default App;
