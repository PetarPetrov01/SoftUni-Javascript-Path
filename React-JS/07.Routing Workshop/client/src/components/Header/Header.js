import { Link } from "react-router-dom";

export const Header = () => {
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
                <div className="user">
                    <Link to="/create">Add Fruit</Link>
                    <Link to="/logout">Logout</Link>
                </div>
                {/* Guest users */}
                <div className="guest">
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </div>
            </nav>
        </header>
    );
};