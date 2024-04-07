import React, { useState, useEffect, useContext } from 'react';
import { Box, styled, Divider } from '@mui/material';
import { AccountContext } from '../../../context/AccountProvider';
import Conversation from './Conversation';
import { getUsers } from '../../../service/api';

const Component = styled(Box)`
    overflow: overlay;
    height: 81vh;
`;

const StyledDivider = styled(Divider)`
    margin: 0 0 0 70px;
    background-color: #e9edef;
    opacity: 0.6;
`;

const Conversations = ({ text }) => {
    const [users, setUsers] = useState({});
    const { account, socket, setActiveUsers } = useContext(AccountContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getUsers();
                // Filter data based on the text input
                const filteredData = text ? data.filter(user => user.name.toLowerCase().includes(text.toLowerCase())) : data;
                setUsers(filteredData);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }
        fetchData();
    }, [text]);

    useEffect(() => {
        socket.current.emit('addUser', account);
        socket.current.on('getUsers', (users) => {
            setActiveUsers(users);
        });
    }, [account, socket, setActiveUsers]);

    return (
        <Component>
            {Object.values(users).map((userArray, index) => (
                userArray.map((user, subIndex) => (
                    user.sub !== account.sub && (
                        <React.Fragment key={user.sub}>
                            <Conversation user={user} />
                            {/* Add a divider if it's not the last user in the array */}
                            {index !== Object.values(users).length - 1 || subIndex !== userArray.length - 1 && <StyledDivider />}
                        </React.Fragment>
                    )
                ))
            ))}
        </Component>
    );
}

export default Conversations;
