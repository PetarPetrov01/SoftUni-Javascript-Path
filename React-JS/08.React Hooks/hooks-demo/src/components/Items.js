import { ItemCard } from "./ItemCard";
import { ItemCardLoading } from "./ItemLoading";

import styles from './Items.module.css';

export const Items = ({
    items
}) => {
    return (
        <div className={styles["items-wrapper"]}>
            {items.length > 0
                ? items.map(i => <ItemCard key={i._id} {...i} />)
                : <>
                    <ItemCardLoading />
                    <ItemCardLoading />
                </>}
        </div>
    );
};