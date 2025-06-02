import './SettingsView.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useStoreContext } from '../context/index.jsx';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

function SettingsView() {
  const { firstName, lastName, email, selectedGenres } = useStoreContext();
  const { setFirst, setLast, setSelected } = useStoreContext();
  const navigate = useNavigate();
  const checkBoxes = useRef({});

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

  const [formData, setFormData] = useState({
    firstName: firstName,
    lastName: lastName,
  });

  useEffect(() => {
    if (selectedGenres && selectedGenres.length > 0) {
      setTimeout(() => {
        selectedGenres.forEach(genre => {
          if (checkBoxes.current[genre.id]) {
            checkBoxes.current[genre.id].checked = true;
          }
        });
      }, 100);
    }
  }, [selectedGenres]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    const selectedGenresIds = Object.keys(checkBoxes.current)
      .filter((genreId) => checkBoxes.current[genreId]?.checked)
      .map(Number);

    if (selectedGenresIds.length < 5) {
      alert("You need at least 5 genres!");
      return;
    }

    const updatedGenres = genres.filter((genre) => selectedGenresIds.includes(genre.id));

    setFirst(formData.firstName);
    setLast(formData.lastName);
    setSelected(updatedGenres);
    alert('Settings updated successfully!');
  };

  return (
    <div className="settings">
      <Header />
      <div className="settings-container">
        <div className="settings-box">
          <h1 className="settings-title">Account Settings</h1>
          <form className="settings-form" onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label" htmlFor="firstName">First Name</label>
              <input className="form-input" id="firstName" name="firstName" type="text" value={formData.firstName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="lastName">Last Name</label>
              <input className="form-input" id="lastName" name="lastName" type="text" value={formData.lastName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email</label>
              <input className="form-input email-display" id="email" name="email" type="email" value={email} readOnly />
            </div>
            <div className='genre-selection'>
              <h2>Choose Your Favourite Genres:</h2>
              <div className='genre-checkboxes'>
                {genres.map((item) => {
                  return (
                    <div key={item.id}>
                      <input type='checkbox' id={`genre-${item.id}`} ref={(el) => (checkBoxes.current[item.id] = el)} />
                      <label htmlFor={`genre-${item.id}`}>{item.genre}</label>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="settings-buttons">
              <button type="submit" className="save-button">Save Changes</button>
              <button type="button" className="back-button" onClick={() => navigate('/movies')}>Back</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SettingsView;