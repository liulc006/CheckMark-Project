import React, { useEffect } from 'react';
import { Button } from '@mui/material';
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
            <h1>Welcome</h1>
            {auth?.email ? 
            <>
                <h1>Hello {auth.email}</h1>
                <Button variant='contained' onClick={loggingOut} sx={{margin:'5px'}}>Logout</Button>
            </>
            :            
            <Login/>
            }
        </>
    );
};

export default App;
