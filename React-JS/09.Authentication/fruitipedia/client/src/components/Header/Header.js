import { Link } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const Header = () => {

    const { user, onLogoutHandler } = useContext(UserContext);
    return (
        <header>
            {/* Navigation */}
            <Link id="logo" to="/">
                <img id="logo-img" src="./images/logo.png" alt="" />
            </Link>
            <nav>
                <div>
                    <Link to="/catalog">Fruits</Link>
                    <Link to="/search">Search</Link>
                </div>
                {/* Logged-in users */}
                {user?._id
                    ? <div className="user">
                        <Link to="/create">Add Fruit</Link>
                        <Link onClick={onLogoutHandler}>Logout</Link>
                    </div>
                    : < div className="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                }
            </nav>
        </header >
    );
};