
import { Items } from "./components/Items";
import * as itemService from "./service/itemService";
import { CreateModal } from "./components/CreateModal/CreateModal";
import { ItemContext } from "./context/ItemContext";
import { useAsyncReducer } from "./hooks/useAsyncRedcuer";

export const ACTIONS = {
    // ITEMS_GET: 'items-get',
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

    const onCreateSubmit = async (e,data) => {
        e.preventDefault();
        console.log(data);
        const result = await itemService.create(data);
        console.log(result);
        dispatch({ type: ACTIONS.ITEMS_ADD, payload: result });
        onCloseClick();
    };

    const onCloseClick = () => {
        setShowCreate(false);
    };

    return (
        <ItemContext.Provider value={{ onCloseClick, onCreateSubmit }}>
            <div className="App">
            </div>
        </ItemContext.Provider>
    );
}

export default App;
