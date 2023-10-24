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
    return (
        <FruitsContext.Provider value={fruitsContext}>
            {children}
        </FruitsContext.Provider>
    );
};

export const useFruitsContext = () => {
    return useContext(FruitsContext);
};
