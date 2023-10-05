import { useEffect, useState } from "react";
import { Character } from "./CharacterCard";
import { Loader } from "./Loader";
import styles from './Characters.module.css';

export const Characters = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch('https://swapi.dev/api/people')
            .then(res => res.json())
            .then(data => {
                setCharacters(data.results);
            })
            .catch(er => alert(er));
    }, [characters]);

    return (
        <div className={styles['characters-container']}>
            {characters.length > 0
                ? characters.map(c => <Character key={c.url} {...c} />)
                : <Loader />}
        </div>
    );
};