import React from 'react';

export interface authContextType {
    access_token: string;
    displayName: string;
    email: string;
    photoURL: string;
    uid: string;
}

const user = {
    currentUser: {
        access_token: "",
        displayName: "",
        email: "",
        photoURL: "",
        uid: "",
        expiry_date: 0
    },
    setCurrentUser: (newState: authContextType | any) => { newState },
};

export const AuthContext = React.createContext(user);