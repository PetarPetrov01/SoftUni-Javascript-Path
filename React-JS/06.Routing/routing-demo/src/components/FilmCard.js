import styles from './Films.module.css';
export const FilmCard = ({
    title,
    director,
    producer
}) => {
    return (
        <div className={styles.filmCard}>
            <h2>{title}</h2>
            <p>Director : {director}</p>
            <p>Proudecrs : {producer}</p>
        </div>
    );
};