import './App.css';
import { Header } from './components/Header';
import { Pagination } from './components/Pagination';
import { useState, useEffect } from 'react';
import * as userService from './services/userService';
function App() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        getUsers();
        async function getUsers(query = null) {
            try {
                const users = await userService.getAll(query);
                setUsers(users.users);
                setLoading(false);
            } catch (error) {
                alert(error);
            }
        }
    }, []);

    return (
        <>
            <Header />
            <main className='main'>
                <section className="card users-container">
                    <Table
                        users={users}
                        showModal={showModal}
                        onControllersClick={onControllersClick}
                        isLoading={isLoading}
                    />
                    <button className="btn-add btn" onClick={(e) => showModalHandler(e, 'Create')}>Add new user</button>
                    <Pagination />
                </section>
                {renderModal(showModal)}

            </main>
        </>
    );
}
