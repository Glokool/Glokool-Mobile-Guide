import React from 'react';

export interface authContextType {
    access_token: string;
    displayName: string | null;
    email: string |null;
    photoURL: string | null;
    uid: string;
    gid : string;
}

const user = {
    currentUser: {
        access_token: "",
        displayName: "",
        email: "",
        photoURL: "",
        uid: "",
        gid : "",
    },
    setCurrentUser: (newState: authContextType | any) => { newState },
};

export const AuthContext = React.createContext(user);