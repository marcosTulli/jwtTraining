'use client';
import * as React from 'react';
import { User } from '@/app/models/models';

const blankUser = {
    firstName: '', lastName: '', email: '', password: ''
};

interface ContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    authCode: string;
    setAuthCode: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalContext = React.createContext<ContextProps>({
    isAuthenticated: false,
    setIsAuthenticated: (): boolean => false,
    user: blankUser,
    setUser: (): User => blankUser,
    authCode: "",
    setAuthCode: (): string => ""
});

export const GlobalContextProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<User>(blankUser);
    const [authCode, setAuthCode] = React.useState<string>("");

    return (
        <GlobalContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            user,
            setUser,
            authCode,
            setAuthCode
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => React.useContext(GlobalContext);




