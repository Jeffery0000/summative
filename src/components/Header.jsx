import './Header.css';
import logoImage from '../assets/logo.png';
import { useNavigate, Link } from "react-router-dom";
import { useStoreContext } from '../context/index.jsx';

function Header() {
    const navigate = useNavigate();
    const { firstName } = useStoreContext();
    const { loggedIn, setLoggedIn } = useStoreContext();

    const handleLogout = () => {
        setLoggedIn(false);
        navigate('/');
    };

    const handleSearch = () => {
        navigate('/movies/search');
    };

    return (
        <div className="header">
            <div className="title">
                <h1>Stream City</h1>
                <img className="logo-image" src={logoImage} alt="Logo Image" />
            </div>
            <div className="welcome-container">
                {loggedIn ? (
                    <> <p className="welcome-message">Hello, {firstName}!</p> </>
                ) : (
                    <></>
                )}
            </div>
            <div className="header-buttons">
                {loggedIn ? (
                    <>
                        <button onClick={handleSearch}>Search</button>
                        <button onClick={() => navigate("/cart")}>Cart</button>
                        <button onClick={() => navigate("/settings")}>Settings</button>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate("/login")}>Login</button>
                        <button onClick={() => navigate("/register")}>Register</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;