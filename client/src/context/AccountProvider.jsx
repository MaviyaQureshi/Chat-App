import React, { createContext, useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export const AccountContext = createContext(null);

const AccountProvider = ({ children }) => {
    const [account, setAccount] = useState();
    const [showLoginButton, setShowLoginButton] = useState(true);
    const [showLogoutButton, setShowLogoutButton] = useState(false);
    const [activeUsers, setActiveUsers] = useState([]);
    const [newMessageFlag, setNewMessageFlag] = useState(false);
    const socket = useRef();

    useEffect(() => {
        socket.current = io('ws://localhost:9000');
        return () => {
            socket.current.disconnect();
        };
    }, []);

    return (
        <AccountContext.Provider
            value={{
                account,
                setAccount,
                showLoginButton,
                setShowLoginButton,
                showLogoutButton,
                setShowLogoutButton,
                socket,
                activeUsers,
                setActiveUsers,
                newMessageFlag,
                setNewMessageFlag,
            }}
        >
            {children}
        </AccountContext.Provider>
    );
};

export default AccountProvider;
