import React, { useContext } from 'react';
import { AppBar, Toolbar, styled, Box } from '@mui/material';

import { AccountContext } from '../context/AccountProvider';

// Components
import ChatDialog from './chat/ChatDialog';
import LoginDialog from './account/LoginDialog';

const Component = styled(Box)`
    height: 100vh;
    background: #DCDCDC;
`;

const Header = styled(AppBar)`
    height: 125px;
    box-shadow: none;
`;

const LoginHeader = styled(AppBar)`
    height: 100%;
    box-shadow: none;
`;

const Messenger = () => {
    const { account } = useContext(AccountContext);

    return (
        <Component>
            {account ? (
                <>
                    <Header>
                        <Toolbar />
                    </Header>
                    <ChatDialog />
                </>
            ) : (
                <>
                    <LoginHeader>
                        <Toolbar />
                    </LoginHeader>
                    <LoginDialog />
                </>
            )}
        </Component>
    );
};

export default Messenger;
