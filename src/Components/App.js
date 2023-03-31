import React, { useEffect, useState } from 'react';
import { TextField, Box, Button, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { attemptLogin, logout, loginWithToken } from '../store';

const App = () => {
    const dispatch = useDispatch();

    const [ credential, setCredential ] = useState({
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState(null);

    const { auth } = useSelector(state=>state);

    const typing = ev => {
        setCredential({...credential, [ev.target.name]: ev.target.value});
    };

    const login = (ev) => {
        ev.preventDefault();
        setErrorMessage(null)
        dispatch(attemptLogin(credential))
            .catch((err)=>{
                if(err.response.status === 404){
                    setErrorMessage('Account Not Found! Please use a valid email.')
                }
                else if (err.response.status === 401){
                    setErrorMessage('Bad Credential! Account and Password do not match.')
                }
            })
    };

    const loggingOut = (ev) => {
        dispatch(logout());
        //clear the credentials
        setCredential({email: '', password: ''});    
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
            <form>
                {errorMessage ? <Alert severity="error">{errorMessage}</Alert>:null}
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
