import { Link } from 'react-router-dom';
import styles from './Characters.module.css';

export const Character = ({
    name,
    height,
    gender,
    url
}) => {
    const id = url.substring(url.lastIndexOf('/') - 1, url.lastIndexOf('/')); //Two nums ???
    console.log(id);

    return (
        <div className={styles.characterCard}>
            <Link to={`./${id}`}>Info</Link>
            <h1>{name}</h1>
            Height: {height}
            <p>Gender: {gender}</p>
        </div>
    );
};