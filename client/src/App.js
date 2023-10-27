import { Route, Routes } from 'react-router-dom';

import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Catalog } from './components/Catalog/Catalog';
import { Register } from './components/Register/Register';
import { Home } from './components/Home/Home';
import { GlobalStyle } from './styles/GlobalStyles';
import { Create } from './components/Create/Create';
import { UserProvider } from './contexts/UserContext';
import { Details } from './components/Details/Details';
import { PropertyProvider } from './contexts/PropertyContext';
import { Edit } from './components/Edit/Edit';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <PropertyProvider>
          <GlobalStyle />
          <Header />

          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/catalog' element={<Catalog />} />
              <Route path='/catalog/:id/details' element={<Details />} />
              <Route path='/catalog/:id/edit' element={<Edit />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/create' element={<Create />} />
              <Route></Route>
            </Routes>
          </main>
        </PropertyProvider>
      </UserProvider>
    </div>
  );
}

export default App;
