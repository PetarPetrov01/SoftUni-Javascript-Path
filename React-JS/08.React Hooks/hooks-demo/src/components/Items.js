import { ItemCard } from "./ItemCard";
import styles from './Items.module.css';

export const Items = ({
    items
}) => {
    return (
        <div className={styles["items-wrapper"]}>
            {items.map(i => <ItemCard key={i._id} {...i} />)}
        </div>
    );
};