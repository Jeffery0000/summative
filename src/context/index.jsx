import { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, firestore } from '../firebase/index.js';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const StoreContext = createContext();

export function StoreProvider({ children }) {
    const [user, setUser] = useState(null);
    const [firstName, setFirst] = useState('');
    const [lastName, setLast] = useState('');
    const [email, setEmail] = useState('');
    const [selectedGenres, setSelected] = useState([]);
    const [previousPurchases, setPurchases] = useState([]);
    const [isAuthReady, setIsAuthReady] = useState(false);
    
    // Use localStorage for cart to persist across page refreshes
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Auth state listener to handle persistence
    useEffect(() => {
        console.log("Setting up auth state listener");
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("Auth state changed:", currentUser ? `User: ${currentUser.uid}` : "No user");
            
            if (currentUser) {
                setUser(currentUser);
                
                // Load user data from Firestore
                try {
                    const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setFirst(userData.firstName || '');
                        setLast(userData.lastName || '');
                        setEmail(userData.email || currentUser.email || '');
                        setSelected(userData.selectedGenres || []);
                        setPurchases(userData.purchases || []);
                    }
                } catch (error) {
                    console.error("Error loading user data:", error);
                }
            } else {
                setUser(null);
                setFirst('');
                setLast('');
                setEmail('');
                setSelected([]);
                setPurchases([]);
                // Don't clear cart when user logs out - keep it in localStorage
            }
            
            // Mark auth as ready regardless of whether user is logged in or not
            setIsAuthReady(true);
        });

        return () => unsubscribe();
    }, []);

    // Function to update user profile
    const updateUserProfile = async (userId, updates) => {
        if (!userId) return;

        try {
            // Update in Firestore
            const userDocRef = doc(firestore, "users", userId);
            await updateDoc(userDocRef, updates);

            // Update in context state
            if (updates.firstName) setFirst(updates.firstName);
            if (updates.lastName) setLast(updates.lastName);
            if (updates.email) setEmail(updates.email);
            if (updates.selectedGenres) setSelected(updates.selectedGenres);
            if (updates.purchases) setPurchases(updates.purchases);

            return true;
        } catch (error) {
            console.error("Error updating user profile:", error);
            return false;
        }
    };

    // Function to handle checkout that also persists purchase data
    const handleCheckout = async () => {
        if (!user || cart.length === 0) return false;

        try {
            const userDocRef = doc(firestore, "users", user.uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const updatedPurchases = [...(userData.purchases || []), ...cart];
                
                // Update Firestore
                await updateDoc(userDocRef, {
                    purchases: updatedPurchases
                });
                
                // Update state
                setPurchases(updatedPurchases);
                setCart([]); // Clear cart after purchase
                localStorage.removeItem('cart'); // Also clear localStorage
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error processing checkout:", error);
            return false;
        }
    };

    const value = {
        user,
        firstName,
        lastName,
        email,
        selectedGenres,
        previousPurchases,
        cart,
        isAuthReady,
        setUser,
        setFirst,
        setLast,
        setEmail,
        setSelected,
        setPurchases,
        setCart,
        updateUserProfile,
        handleCheckout
    };

    // Show loading state until auth is ready
    if (!isAuthReady) {
        return (
            <StoreContext.Provider value={value}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    background: '#1d1e22',
                    color: '#00ff88'
                }}>
                    <h2>Loading...</h2>
                </div>
            </StoreContext.Provider>
        );
    }

    return (
        <StoreContext.Provider value={value}>
            {children}
        </StoreContext.Provider>
    );
}

export function useStoreContext() {
    return useContext(StoreContext);
}