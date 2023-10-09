import { Route, Routes, useNavigate } from "react-router-dom";
    return (
        <div className="App">
            <div id="wrapper">
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                    </Routes>
                </main>
            </div>
            <Footer />
        </div >
    );
}

export default App;
