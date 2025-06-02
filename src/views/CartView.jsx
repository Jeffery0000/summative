import './CartView.css';
import Header from '../components/Header';
import { useStoreContext } from '../context/index.jsx';
import { useNavigate } from 'react-router-dom';

function CartView() {
  const { cart, setCart } = useStoreContext();
  const navigate = useNavigate();

  return (
    <div className="cart">
      <Header />
      <div className="cart-header">
        <button className="back-button" onClick={() => navigate('/movies')}>Back</button>
        <h1 className='cart-title'>Your Cart</h1>
      </div>
      <div className="cart-items-container">
        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img className='cart-item-image' src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />
                <h2 className='cart-item-title'>{item.title}</h2>
                <button className='cart-item-button' onClick={() => setCart(cart.filter(movie => movie.id !== item.id))}>Remove</button>
              </div>
            ))
          ) : (
            <p className='empty-cart-message'>Your cart is empty!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartView;