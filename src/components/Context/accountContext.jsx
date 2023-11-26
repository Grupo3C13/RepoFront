import { createContext, useContext, useState, useEffect } from 'react';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const updateUserData = (data) => {
        setUserData(data);
    };

    const clearUserData = () => {
        setUserData(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {

        // const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        const storedUserData = JSON.parse(sessionStorage.getItem('userData'));
        console.log('storedUserData: ' + storedUserData);
        if (storedUserData) {
            updateUserData(storedUserData);
            setIsAuthenticated(true);
        }
    }, []); 

    return (
        <AccountContext.Provider value={{ userData, updateUserData, clearUserData, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => {
    return useContext(AccountContext);
};