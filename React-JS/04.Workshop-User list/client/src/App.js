import './App.css';
import { Header } from './components/Header';
import { Pagination } from './components/Pagination';
import { Table } from './components/Table';
import { useState, useEffect } from 'react';
import * as userService from './services/userService';
import { CreateModal } from './components/CreateModal';
function App() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(null);
    const [isLoading, setLoading] = useState(true);

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

    async function onCreateClick(e, userId) {
        e.preventDefault();
        setLoading(true);
        const { country, city, street, streetNumber, ...formData } = Object.fromEntries(new FormData(e.target));
        const data = Object.assign(formData, { address: { country, city, street, streetNumber } });

        let newUser;
        try {
            //If userId is passed it's Update 
            if (userId) {
                newUser = await userService.update(userId, data);
                setUsers(state => state.map(u => u._id === userId ? newUser.user : u));
            } else {
                newUser = await userService.create(data);
                setUsers(state => [...state, newUser.user]);
            }

            setShowModal(null);
            setLoading(false);
        } catch (error) {
            alert(error);
        }
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


export default App;
