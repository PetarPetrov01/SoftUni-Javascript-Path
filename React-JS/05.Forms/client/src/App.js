import './App.css';
import { Header } from './components/Header';
import { Pagination } from './components/Pagination';
import { Search } from './components/Search';
import { Table } from './components/Table';
import { useState, useEffect } from 'react';
import * as userService from './services/userService';
import { CreateModal } from './components/CreateModal';
import { UserInfo } from './components/UserInfo';
import { DeleteModal } from './components/DeleteModal';
function App() {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState(null);
    useEffect(() => {
        getUsers();
        async function getUsers() {
            try {
                const users = await userService.getAll(search, sort);
                setUsers(users.users);
                setLoading(false);
            } catch (error) {
                alert(error);
            }
        }
    }, [sort, search]);

    function showModalHandler(e, modalType) {
        e.preventDefault();
        setShowModal(modalType);
    }

    async function onCreateClick(e, userId) {
        e.preventDefault();
        setLoading(true);
        const { country, city, street, streetNumber, ...formData } = Object.fromEntries(new FormData(e.target));
        const data = Object.assign(formData, { address: { country, city, street, streetNumber } });

        let result;
        try {
            //If userId is passed, the user is being edited
            if (userId) {
                result = await userService.update(userId, data);
                const newUser = result.user;
                setUsers(state => state.map(u => u._id === userId ? newUser : u));
            } else {
                result = await userService.create(data);
                const newUser = result.user;
                setUsers(state => [...state, newUser]);
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
                    <Search onSearch={onSearch} />
                    <Table
                        users={users}
                        showModal={showModal}
                        onControllersClick={onControllersClick}
                        isLoading={isLoading}
                        onSortChange={onSortChange}
                    />
                    <button className="btn-add btn" onClick={(e) => showModalHandler(e, 'Create')}>Add new user</button>
                    <Pagination />
                </section>
                {renderModal(showModal)}

            </main>
        </>
    );
}

/*{showModal === 'create' ? <CreateModal onCreateClick={onCreateClick} showModalHandler={showModalHandler} /> : null}
{showModal === 'userInfo' ? <UserInfo {...user} showModalHandler={showModalHandler} /> : null}
{showModal === 'deleteUser' ? <DeleteModal userId={selectedUserId} showModalHandler={showModalHandler} confirmDelete={confirmDelete} /> : null}
*/

export default App;
