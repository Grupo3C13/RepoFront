import { createContext, useContext, useState, useEffect } from 'react';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [usersData, setUsersData] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const updateUsersData = (data) => {
        setUsersData(data);
    };

    const clearUsersData = () => {
        setUsersData(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {

        const storedUsersData = JSON.parse(localStorage.getItem('userData'));
        console.log('storedUsersData: ' + storedUsersData);
        if (storedUsersData) {
            updateUsersData(storedUsersData);
            setIsAuthenticated(true);
        }
    }, []); 
    return (
        <AccountContext.Provider value={{ usersData, updateUsersData, clearUsersData, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccount = () => {
    return useContext(AccountContext);
};
