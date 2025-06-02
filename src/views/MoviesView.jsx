import './MoviesView.css';
import Header from '../components/Header';
import Genres from '../components/Genres';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

function MoviesView() {
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

    return (
        <div className='movies'>
            <Header />
            <Genres genresList={genres} />
            <div className='genre-movies'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default MoviesView;