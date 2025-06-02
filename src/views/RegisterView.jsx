import './RegisterView.css';
import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context/index.jsx';
import { useRef } from 'react';

function RegisterView() {
    const {
        setFirst,
        setLast,
        setEmail,
        setPassword,
        setSelected,
        setCurrentGenre,
        setLoggedIn
    } = useStoreContext();

    const navigate = useNavigate();

    const firstName = useRef('');
    const lastName = useRef('');
    const email = useRef('');
    const password = useRef('');
    const confirmedPassword = useRef('');

    const genres = [
        { genre: "Action", id: 28 },
        { genre: "Animation", id: 16 },
        { genre: "Crime", id: 80 },
        { genre: "Sci-Fi", id: 878 },
        { genre: "Mystery", id: 9648 },
        { genre: "Adventure", id: 12 },
        { genre: "Family", id: 10751 },
        { genre: "History", id: 36 },
        { genre: "Fantasy", id: 14 },
        { genre: "Horror", id: 27 }
    ];

    const checkBoxes = useRef({});

    const handleRegister = (e) => {
        e.preventDefault();

        const selectedGenresIds = Object.keys(checkBoxes.current).filter((genreId) => checkBoxes.current[genreId].checked).map(Number);

        if (selectedGenresIds.length < 5) {
            alert("You need at least 5 genres!");
            return;
        }

        const selectedGenres = genres.filter((genre) => selectedGenresIds.includes(genre.id));

        if (confirmedPassword.current.value != password.current.value) {
            alert("Your passwords don't match!");
            return;
        }

        setFirst(firstName.current.value);
        setLast(lastName.current.value);
        setEmail(email.current.value);
        setPassword(password.current.value);
        setSelected(selectedGenres);
        setCurrentGenre(selectedGenresIds[0].genre);

        setLoggedIn(true);
        navigate('/movies/genre/' + selectedGenresIds[0]);
    };

    return (
        <div className='register'>
            <h1 className="register-title">Register</h1>
            <form className='register-form' onSubmit={handleRegister}>
                <label htmlFor="first-name" className='form-label'>First name</label>
                <input id='first-name' type="text" name='first-name' className='form-input' ref={firstName} required />
                <label htmlFor="last-name" className='form-label'>Last name</label>
                <input id='last-name' type="text" name='last-name' className='form-input' ref={lastName} required />
                <label htmlFor="email" className='form-label'>Email</label>
                <input id='email' type="email" name='email' className='form-input' ref={email} required />
                <label htmlFor="password" className='form-label'>Password</label>
                <input id="password" type='password' name="password" className='form-input' ref={password} required />
                <label htmlFor="re-password" className='form-label'>Re-enter Password</label>
                <input id='re-password' type='password' name='re-password' className='form-input' ref={confirmedPassword} required />
                <div className='genre-selection'>
                    <h2>Choose Your Favourite Genres:</h2>
                    <div className='genre-checkboxes'>
                        {genres.map((item) => {
                            return (
                                <div key={item.id}>
                                    <input type='checkbox' id={`genre-${item.id}`} ref={(el) => (checkBoxes.current[item.id] = el)} />
                                    <label htmlFor={`genre-${item.id}`}>{item.genre} </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button type='submit' className='submit-button'>Register</button>
            </form>
        </div>
    );
}

export default RegisterView;