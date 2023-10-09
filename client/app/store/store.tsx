'use client';
import * as React from 'react';


interface ContextProps {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    test: string;
    setTest: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalContext = React.createContext<ContextProps>({
    isAuthenticated: false,
    setIsAuthenticated: (): boolean => false,
    test: "",
    setTest: (): string => ""
});

export const GlobalContextProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
    const [test, setTest] = React.useState<string>("");

    return (
        <GlobalContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated,
            test,
            setTest
        }}>{children}</GlobalContext.Provider>
    );
};

export const useGlobalContext = () => React.useContext(GlobalContext);




