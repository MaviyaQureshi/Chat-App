import React from 'react';
import { Box, InputBase, styled } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

const Component = styled(Box)`
    background: #fff;
    height: 45px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #F2F2F2;
`;

const Wrapper = styled(Box)`
    position: relative;
    border-radius: 5px;
    background-color: #dedede;
    margin: 4px 0px 0px 25px;
    width: 90%;
`;

const Icon = styled(Box)`
    color: #919191;
    padding: 14px;
    padding-left: 20px;
    height: 100%;
    position: absolute;
`;

const InputField = styled(InputBase)`
    width: 100%;
    padding: 10px;
    padding-left: 65px;
    font-size: 14px;
`;

const Search = ({ setText }) => {
    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    return (
        <Component>
            <Wrapper>
                <Icon>
                    <SearchIcon fontSize="medium" />
                </Icon>
                <InputField
                    placeholder="Search or start new chat"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleInputChange}
                />
            </Wrapper>
        </Component>
    );
}

export default Search;
