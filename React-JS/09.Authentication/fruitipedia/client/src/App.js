function App() {

    return (
        <div className="App">
            <UserProvider>

                <div id="wrapper">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                        </Routes>
                    </main>
                </div>
                <Footer />
            </UserProvider >
        </div >
    );
}
