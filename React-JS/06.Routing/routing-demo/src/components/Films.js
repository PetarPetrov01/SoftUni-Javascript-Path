import { useEffect, useState } from "react";
import { FilmCard } from "./FilmCard";
import styles from "./Films.module.css";
import { Loader } from "./Loader";

export const Films = () => {

    const [films, setFilms] = useState([]);

    useEffect(() => {
        fetch('https://swapi.dev/api/films')
            .then(res => res.json())
            .then(data => {
                setFilms(data.results);
            })
            .catch(error => console.log(error));
    }, [films]);

    return (
        <div className={styles['films-container']}>
            {films.length > 0
                ? films.map(f => <FilmCard key={f.episode_id} {...f} />)
                : <Loader />
            }
        </div>
    );
};