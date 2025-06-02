import './CartView.css';
import Header from '../components/Header';
import { useStoreContext } from '../context/index.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { firestore } from '../firebase/index.js';

function CartView() {
  const { cart, setCart, user, previousPurchases, setPreviousPurchases } = useStoreContext();
  const navigate = useNavigate();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setLoading(true);

    try {
      // Get user document reference
      const userDocRef = doc(firestore, "users", user.uid);

      // Update Firestore with new purchases
      await updateDoc(userDocRef, {
        purchases: arrayUnion(...cart)
      });

      // Update local state for purchases
      const updatedPurchases = [...previousPurchases, ...cart];
      setPreviousPurchases(updatedPurchases);

      // Clear cart
      setCart([]);

      // Clear local storage for cart
      localStorage.removeItem(`cart_${user.uid}`);

      // Show success message
      setCheckoutSuccess(true);

      // Reset success message after 5 seconds
      setTimeout(() => {
        setCheckoutSuccess(false);
      }, 5000);

    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cart">
      <Header />
      <div className="cart-header">
        <button className="back-button" onClick={() => navigate('/movies')}>Back</button>
        <h1 className='cart-title'>Your Cart</h1>
      </div>

      {checkoutSuccess && (
        <div className="checkout-success-message">
          Thank you for your purchase! Enjoy your movies!
        </div>
      )}

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

      {cart.length > 0 && (
        <div className="checkout-container">
          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Checkout'}
          </button>
        </div>
      )}
    </div>
  );
}

export default CartView;