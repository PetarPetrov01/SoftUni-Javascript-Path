import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import * as fruitService from '../services/fruitService';



export const FruitsContext = createContext();

export const FruitsProvider = ({
    children
}) => {

    console.log('INTO CONTEXT');
    const navigate = useNavigate();
    const [fruits, setFruits] = useState();

    useEffect(() => {
        console.log('INTPO USEEFFECT');
        fruitService.getAll()
            .then(result => {
                setFruits(result);
            })
            .catch(er => alert(er));
    }, []);

    const onCreateHandler = async (e, fruit) => {
        e.preventDefault();
        try {
            if (Object.values(fruit).some(v => v === '')) {
                throw new Error('All inputs must be filled!');
            }
            const newFruit = await fruitService.create(fruit);
            setFruits(fruits => [...fruits, newFruit]);
            navigate('/catalog');
        } catch (error) {
            alert(error);
        }
    };

    const onEditHanlder = async (e, id, editedFruit) => {
        e.preventDefault();
        try {
            await fruitService.edit(id, editedFruit);
            setFruits(fruits => fruits.map(f => f._id === id ? editedFruit : f));
            navigate(`/catalog/${id}`);
        } catch (error) {
            alert(error);
        }
    };

    const onDeleteHandler = async (e, id) => {
        e.preventDefault();
        try {
            await fruitService.deleteById(id);
            setFruits(fruits => fruits.filter(f => f._id !== id));
            navigate('/catalog');
        } catch (error) {
            alert(error);
        }
    };

    const getFruit = (fruitId) => {
        //AT FIRST RENDER fruits is undefined!
        return fruits?.find(f => f._id === fruitId);
    };

    const fruitsContext = {
        fruits,
        onCreateHandler,
        onDeleteHandler,
        onEditHanlder,
        getFruit
    };

    return (
        <FruitsContext.Provider value={fruitsContext}>
            {children}
        </FruitsContext.Provider>
    );
};

export const useFruitsContext = () => {
    return useContext(FruitsContext);
};
