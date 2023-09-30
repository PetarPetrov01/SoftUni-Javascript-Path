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

    function showModalHandler(e, modalType) {
        e.preventDefault();
        setShowModal(modalType);
    }

    function renderModal(modalType) {
        switch (modalType) {
            case 'Create':
                return <CreateModal onCreateClick={onCreateClick} showModalHandler={showModalHandler} />;
            case 'Info':
                return <UserInfo {...user} showModalHandler={showModalHandler} />;
            case 'Delete':
                return <DeleteModal userId={selectedUserId} showModalHandler={showModalHandler} confirmDelete={confirmDelete} />;
            case 'Edit':
                return <CreateModal onCreateClick={onCreateClick} showModalHandler={showModalHandler} user={user} />;
            default: return null;
        }
    }

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
