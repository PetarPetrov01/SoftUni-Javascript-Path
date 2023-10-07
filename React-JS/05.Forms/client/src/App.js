import { useState, useEffect } from 'react';
import './App.css';

import { Header } from './components/Header';
import { Pagination } from './components/Pagination';
import { Search } from './components/Search';
import { Table } from './components/Table';
import * as userService from './services/userService';
import { CreateModal } from './components/CreateModal';
import { UserInfo } from './components/UserInfo';
import { DeleteModal } from './components/DeleteModal';
import { UserContext } from './context/UserContext';

function App() {

    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(null);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [sort, setSort] = useState(null);
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

    async function onCreateClick(e, formValues, userId) {
        e.preventDefault();
        setLoading(true);

        const { country, city, street, streetNumber, ...data } = formValues;
        Object.assign(data, { address: { country, city, street, streetNumber } });

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

    async function onControllersClick(e, userId, type) {
        e.preventDefault();
        setLoading(true);

        if (type === 'Delete') {
            //If Delete btn is clicked
            setSelectedUserId(userId);
        } else {
            //If Edit or Info btn is clicked
            try {
                const data = await userService.getById(userId);
                setUser(data.user);
            } catch (error) {
                alert(error);
            }
        }

        setShowModal(type);
        setLoading(false);
    }

    async function confirmDelete(e, userId) {
        e.preventDefault();
        setLoading(true);

        try {
            await userService.deleteById(userId);
            setUsers(state => state.filter(u => u._id !== userId));
            setShowModal(null);
            setLoading(false);
        } catch (error) {
            alert(error);
        }
    }

    function renderModal(modalType) {
        switch (modalType) {
            case 'Create':
                return <CreateModal onCreateClick={onCreateClick} />;
            case 'Info':
                return <UserInfo {...user} />;
            case 'Delete':
                return <DeleteModal userId={selectedUserId} confirmDelete={confirmDelete} />;
            case 'Edit':
                return <CreateModal onCreateClick={onCreateClick} user={user} />;
            default: return null;
        }
    }

    async function onSearch(e, searchValue, criteria) {
        e.preventDefault();
        setLoading(true);

        const query = {
            search: searchValue,
            criteria
        };
        console.log(criteria);
        if (criteria !== 'Not selected') {
            setSearch(query);
        }
        setLoading(false);
    }

    function onSortChange(sortData) {

        const details = {
            "First name": 'firstName',
            "Last name": 'lastName',
            "Email": 'email',
            "Phone": 'phone',
            "Created": 'createdAt'
        };

        sortData.sort = details[sortData.sort];

        setSort(sortData);
    }

    const context = { onControllersClick, showModalHandler };

    return (
        <>
            <Header />
            <main className='main'>
                <UserContext.Provider value={context}>

                    <section className="card users-container">
                        <Search onSearch={onSearch} />

                        <Table
                            users={users}
                            isLoading={isLoading}
                            onSortChange={onSortChange}
                        />

                        <button className="btn-add btn" onClick={(e) => showModalHandler(e, 'Create')}>Add new user</button>
                        <Pagination />
                    </section>
                    {renderModal(showModal)}

                </UserContext.Provider>

            </main>
        </>
    );
}

/*{showModal === 'create' ? <CreateModal onCreateClick={onCreateClick} showModalHandler={showModalHandler} /> : null}
{showModal === 'userInfo' ? <UserInfo {...user} showModalHandler={showModalHandler} /> : null}
{showModal === 'deleteUser' ? <DeleteModal userId={selectedUserId} showModalHandler={showModalHandler} confirmDelete={confirmDelete} /> : null}
*/

export default App;
