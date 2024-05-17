import React, {createContext, useState} from 'react';
import {Item, User} from '../types/user.type';

interface initialStateType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    profile: User | null;
    setProfile: React.Dispatch<React.SetStateAction<User | null>>;
    cart: Item[];
    setCart: React.Dispatch<React.SetStateAction<Item[]>>;
}

const initialState: initialStateType = {
    isAuthenticated: false,
    setIsAuthenticated: () => null,
    profile: null,
    setProfile: () => null,
    cart: [],
    setCart: () => null,
};

export const AppContext = createContext(initialState);

export const AppProvider = ({children}: {children: React.ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(initialState.isAuthenticated);
    const [profile, setProfile] = useState(initialState.profile);
    const [cart, setCart] = useState(initialState.cart);
    return (
        <AppContext.Provider value={{isAuthenticated, setIsAuthenticated, profile, setProfile, cart, setCart}}>
            {children}
        </AppContext.Provider>
    );
};
