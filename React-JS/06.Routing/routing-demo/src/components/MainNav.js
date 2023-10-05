import { NavLink } from "react-router-dom";
import styles from './MainNav.module.css';

export const MainNav = () => {
    return (
        <nav className={styles.navigation}>
            <ul>
                <li><NavLink to='/people'>People</NavLink></li>
                <li><NavLink to='/films'>Films</NavLink></li>
                <li><NavLink to='/starships'>Starships</NavLink></li>
            </ul>
        </nav>
    );
};