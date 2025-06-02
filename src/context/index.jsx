import { createContext, useState, useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../firebase/index.js";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    // User information
    const [user, setUser] = useState(null);
    const [selectedGenres, setSelected] = useState([]);
    
    // Shopping cart
    const [cart, setCart] = useState([]);
    const [previousPurchases, setPreviousPurchases] = useState([]);
    
    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                
                // Get user data from Firestore
                try {
                    const userDoc = await getDoc(doc(firestore, "users", currentUser.uid));
                    
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setSelected(userData.selectedGenres || []);
                        setPreviousPurchases(userData.purchases || []);
                    } else if (currentUser.providerData[0]?.providerId === 'google.com') {
                        // First-time Google sign-in without complete profile
                        // We'll redirect to profile completion in LoginView.jsx
                        console.log("New Google user detected, profile needs completion");
                    }
                    
                    // Load cart from local storage
                    const savedCart = localStorage.getItem(`cart_${currentUser.uid}`);
                    if (savedCart) {
                        setCart(JSON.parse(savedCart));
                    }
                } catch (err) {
                    console.error("Error loading user data:", err);
                }
            } else {
                // User is signed out
                setUser(null);
                setSelected([]);
                setCart([]);
                setPreviousPurchases([]);
            }
        });
        
        // Clean up subscription
        return () => unsubscribe();
    }, []);
    
    // Update localStorage when cart changes
    useEffect(() => {
        if (user) {
            localStorage.setItem(`cart_${user.uid}`, JSON.stringify(cart));
        }
    }, [cart, user]);

    // Helper function to check if a user profile exists in Firestore
    const checkUserProfile = async (userId) => {
        try {
            const userDoc = await getDoc(doc(firestore, "users", userId));
            return userDoc.exists();
        } catch (error) {
            console.error("Error checking user profile:", error);
            return false;
        }
    };

    // Helper function to create/update a user profile
    const updateUserProfile = async (userId, userData) => {
        try {
            await setDoc(doc(firestore, "users", userId), userData, { merge: true });
            return true;
        } catch (error) {
            console.error("Error updating user profile:", error);
            return false;
        }
    };

    return (
        <StoreContext.Provider value={{
            user, 
            setUser,
            cart, 
            setCart,
            selectedGenres, 
            setSelected,
            previousPurchases,
            setPreviousPurchases,
            checkUserProfile,
            updateUserProfile
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStoreContext = () => {
    return useContext(StoreContext);
};