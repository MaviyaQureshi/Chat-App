import React from 'react';
import { styled, Drawer, Box, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

// Components
import Profile from './Profile';

const Header = styled(Box)`
    background: #008069;
    height: 107px;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    padding-left: 15px;
`;

const Component = styled(Box)`
    background: #ededed;
    height: calc(100% - 107px);
`;

const Text = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
`;

const drawerStyle = {
    left: 20,
    top: 17,
    height: '95%',
    width: '30%',
    boxShadow: 'none'
};

const InfoDrawer = ({ open, setOpen, profile }) => {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: drawerStyle }}
            style={{ zIndex: 1500 }}
        >
            <Header>
                <ArrowBack onClick={handleClose} />
                <Text>Profile</Text>
            </Header>
            <Component>
                {profile && <Profile />}
            </Component>
        </Drawer>
    );
}

export default InfoDrawer;
