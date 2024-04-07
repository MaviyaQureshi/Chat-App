import React, { useContext } from 'react';
import { Dialog, Box, styled } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";

import { addUser } from '../../service/api';
import { AccountContext } from '../../context/AccountProvider';
import { qrCodeImage } from '../../constants/data';

const Component = styled(Box)`
    display: flex; 
    justify-content: center;
    align-items: center;
`;

const QRCode = styled('img')({
    margin: '200px 0 0 50px',
    height: 264,
    width: 264
});

const dialogStyle = {
    height: '95%',
    width: '60%',
    maxWidth: '100',
    maxHeight: '100%',
    borderRadius: 0,
    boxShadow: 'none',
    overflow: 'hidden'
}

const LoginDialog = () => {
    const { setAccount, showLoginButton, setShowLoginButton, setShowLogoutButton } = useContext(AccountContext);

    const onLoginSuccess = async (res) => {
        let decoded = jwt_decode(res.credential);
        setAccount(decoded);
        setShowLoginButton(false);
        setShowLogoutButton(true);
        await addUser(decoded);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    return (
        <Dialog
            open={true}
            maxWidth={'md'}
            BackdropProps={{ style: { backgroundColor: 'unset' } }}
            PaperProps={{ sx: dialogStyle }}
        >
            <Component>
                <Box style={{ position: 'relative' }}>
                    <QRCode src={qrCodeImage} alt="QR Code" />
                    <Box style={{ position: 'absolute', top: '65%', transform: 'translateX(25%) translateY(-25%)' }}>
                        {showLoginButton && (
                            <GoogleLogin
                                buttonText=""
                                onSuccess={onLoginSuccess}
                                onError={onLoginFailure}
                            />
                        )}
                    </Box>
                </Box>
            </Component>
        </Dialog>
    )
}

export default LoginDialog;
