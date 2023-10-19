import { useState, useEffect } from "react";

import * as fruitService from '../../services/fruitService';
import { FruitItem } from "../Catalog/FruitItem";

export const Search = () => {

    const [fruits, setFruits] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fruitService.getAll()
            .then(result => {
                setFruits(result);
            })
            .catch(er => alert(er));
    }, []);

    const onChangeHandler = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    };

    const onSearchHandler = async (e) => {
        e.preventDefault();
        try {
            const result = await fruitService.getAll(search);
            setFruits(result);
        } catch (error) {
            alert(error);
        }
    };

    return (<section id="search">
        <div className="form">
            <h2>Search</h2>
            <form className="search-form" onSubmit={onSearchHandler}>
                <input type="text" name="search" id="search-input" onChange={onChangeHandler} value={search} />
                <button className="button-list">Search</button>
            </form>
        </div>
        <h4>Results:</h4>
        <div className="search-result">
            {fruits.length > 0
                ? fruits.map(f => <FruitItem key={f._id} {...f} />)
                : <p className="no-result">No result.</p>
            }

            {/*If there are matches display a div with information about every fruit*/}

        </div>
    </section>);
};
