import { Link } from "react-router-dom";
export const Header = () => {

    const { user, onLogoutHandler } = useContext(UserContext);
    return (
        <header>
            {/* Navigation */}
            <Link id="logo" to="/">
                <img id="logo-img" src="./images/logo.png" alt="" />
            </Link>
            <nav>
                    <Link to="/catalog">Fruits</Link>
                    <Link to="/search">Search</Link>
                {/* Logged-in users */}
                        <Link to="/create">Add Fruit</Link>
                        <Link onClick={onLogoutHandler}>Logout</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                }
            </nav>
        </header >
    );
};