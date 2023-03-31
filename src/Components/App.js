import React, { useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout, loginWithToken } from '../store';
import { useSelector } from 'react-redux';
import {Login} from './Login';

const App = () => {
    const dispatch = useDispatch();

    const { auth } = useSelector(state=>state);

    const loggingOut = (ev) => {
        dispatch(logout());
    };

    useEffect(()=>{
        //Runs at the beginning to check with you are logged in already
        dispatch(loginWithToken());
    }, []);

    return (
        <>
            <h1 style={{position:'absolute'}}>Welcome</h1>
            <Box sx={{display:'flex', flexDirection:'row'}}>
                <Box>
                    <Box component='img' 
                        alt='background-image'
                        src='../static/snow-mountain.jpg'
                        sx={{height: '100vh', width:'60vw', objectFit: 'cover'}}
                    />

                </Box>
                <Box>
                    {auth?.email ? 
                    <>
                        <h1>Hello {auth.email}</h1>
                        <Button variant='contained' onClick={loggingOut} sx={{margin:'5px'}}>Logout</Button>
                    </>
                    :            
                    <Login/>
                    }
                </Box>
            </Box>
        </>
    );
};

export default App;
