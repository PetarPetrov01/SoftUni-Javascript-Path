import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function App() {
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
        </div >
    );
}

export default App;
