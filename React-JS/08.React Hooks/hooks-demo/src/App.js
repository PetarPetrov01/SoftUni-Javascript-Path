import { useEffect, useState } from "react";

import { Items } from "./components/Items";
import { Navigation } from "./components/Navigation";
import * as itemService from "./service/itemService";
import { CreateModal } from "./components/CreateModal/CreateModal";
import { ItemContext } from "./context/ItemContext";
import { useAsyncReducer } from "./hooks/useAsyncRedcuer";

export const ACTIONS = {
    // ITEMS_GET: 'items-get',
    ITEMS_LOADING: 'items-loading',
    ITEMS_GET_SUCCESS: 'items-get-success',
    ITEMS_ADD: 'items-add'
};

const reducer = (items, action) => {

    switch (action.type) {
        // case ACTIONS.ITEMS_GET:
        //     return itemService.getAll()
        //         .then(result => {
        //             return [...result];
        //         });
        case ACTIONS.ITEMS_GET_SUCCESS:
            return [...action.payload];
        case ACTIONS.ITEMS_ADD:
            return [...items, action.payload];
        default: return items;
    }
};

function App() {
    const [items, dispatch] = useAsyncReducer(reducer, []);
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await itemService.getAll();
            dispatch({ type: ACTIONS.ITEMS_GET_SUCCESS, payload: result });
        };

        fetchData();
    }, []);


    const onCreateClick = () => {
        setShowCreate(true);
    };

    const onCreateSubmit = async (e, data) => {
        e.preventDefault();
        const result = await itemService.create(data);
        dispatch({ type: ACTIONS.ITEMS_ADD, payload: result });
        onCloseClick();
    };

    const onCloseClick = () => {
        setShowCreate(false);
    };

    return (
        <ItemContext.Provider value={{ onCloseClick, onCreateSubmit }}>
            <div className="App">
                <Navigation onCreateClick={onCreateClick} />
                <Items items={items} />
                {<CreateModal show={showCreate} />}
            </div>
        </ItemContext.Provider>
    );
}

export default App;
