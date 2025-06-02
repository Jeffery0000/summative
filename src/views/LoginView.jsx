import './LoginView.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStoreContext } from "../context/index.jsx";

function LoginView() {
    const navigate = useNavigate();
    const { email, password, setLoggedIn, selectedGenres } = useStoreContext();
    const [userPassword, setPassword] = useState('');

    const handleLogin = (e) => {
        const genre = selectedGenres[0].id;

        e.preventDefault();
        if (userPassword === password) {
            setLoggedIn(true);
            navigate('/movies/genre/' + genre);
        } else {
            alert("Wrong password!");
        }
    };

    return (
        <div className='login'>
            <h1 className='login-title'>Login</h1>
            <form className='login-form' onSubmit={handleLogin}>
                <label className='form-label' htmlFor="email">Email</label>
                <input id='email' type='email' name='email' className='form-input' required />
                <label htmlFor="password" className='form-label'>Password</label>
                <input id="password" type='password' name="password" className='form-input' value={userPassword} onChange={(event) => { setPassword(event.target.value) }} required />
                <button type='submit' className='submit-button'>Login</button>
            </form>
        </div>
    );
}

export default LoginView;