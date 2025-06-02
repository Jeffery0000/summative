import './Hero.css';
import heroImage from '../assets/hero1.jpg';

function Hero() {

    return (
        <div className='hero' id='hero'>
            <img className="hero-image" src={heroImage} alt="Hero Image" />
            <div className="hero-content">
                <h2>Welcome to Stream City</h2>
                <p>Experience a new way to stream.</p>
            </div>
        </div>
    );
}

export default Hero;