import React from 'react';
import { Box, styled, Divider } from '@mui/material';
// import { emptyChatImage } from '../../../constants/data';

const Component = styled(Box)`
    background: #f8f9fa;
    padding: 30px 0;
    text-align: center;
    height: 100%;
`;

const Container = styled(Box)`
    padding: 0 200px;
`;

const StyledDivider = styled(Divider)`
    margin: 40px 0;
    opacity: 0.4;
`;

const EmptyChat = () => {
    return (
        <Component>
            <Container>
                <StyledDivider />
            </Container>
        </Component>
    )
}

export default EmptyChat;
