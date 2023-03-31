import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { attemptLogin } from '../store';
import { TextField, Box, Button, Alert } from '@mui/material';

export const Login = () => {
    const dispatch = useDispatch();

    const [ credential, setCredential ] = useState({
        email: '',
        password: '',
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const typing = ev => {
        setCredential({...credential, [ev.target.name]: ev.target.value});
    };

    const login = (ev) => {
        ev.preventDefault();
        setErrorMessage(null);
        dispatch(attemptLogin(credential))
            .catch((err)=>{
                if(err.response.status === 404){
                    setErrorMessage('Account Not Found! Please use a valid email.')
                }
                else if (err.response.status === 401){
                    setErrorMessage('Bad Credential! Account and Password do not match.')
                }
            });
    };

    return (
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
    );
};