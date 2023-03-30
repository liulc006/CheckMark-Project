import React, { useEffect, useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { attemptLogin, logout } from '../store';

const App = () => {
    const dispatch = useDispatch();

    const [ credential, setCredential ] = useState({
        email: '',
        password: '',
    });

    const auth = useSelector(state=>state.auth);

    const typing = ev => {
        setCredential({...credential, [ev.target.name]: ev.target.value});
    };

    const login = (ev) => {
        ev.preventDefault();
        dispatch(attemptLogin(credential));
    };

    const loggingOut = (ev) => {
        ev.preventDefault();
        dispatch(logout);

        //clear the credentials
        // setCredential({email: '', password: ''});    
    };

    return (
        <>
            <h1>Welcome</h1>
            {auth?.email ? 
            <>
                <h1>Hello {auth.email}</h1>
                <Button variant='contained' onClick={loggingOut} sx={{margin:'5px'}}>Logout</Button>
            </>
            :            
            <form>
                <TextField id='email' label='Email' variant='outlined'
                    onChange={ typing }
                    value = {credential.email}
                    name = 'email'
                    sx={{margin:'5px'}}
                />
                <TextField id='password' label='Password' variant='outlined'
                    onChange={ typing }
                    value = {credential.password}
                    name = 'password'
                    sx={{margin:'5px'}}
                />
                <Button variant='contained' onClick={login} sx={{margin:'5px'}}>Login</Button>
            </form>
            }
        </>
    );
};

export default App;
