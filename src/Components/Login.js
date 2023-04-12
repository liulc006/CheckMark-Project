import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { attemptLogin } from '../store';
import { TextField, Box, Button, Alert, Typography } from '@mui/material';

const Login = () => {
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
        <Box>
            <Box component='img' 
                alt='background-image'
                src='../static/todolist.jpg'
                sx={{height: '100vh', width:'100vw', objectFit: 'cover', position:'absolute', zIndex:'-1'}}
            />
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                <form style={{display:'flex', flexDirection:'column', margin:'5px', alignItems:'center', border:'black 1px solid', backgroundColor:'white',
                    borderRadius:'2%', padding:'2rem', marginTop:'15rem'
                }}>
                    <Typography variant='h5'>Welcome to CheckMark!</Typography>
                    <Typography variant='h4'>User Login</Typography>
                    {errorMessage ? <Alert sx={{width:'100%'}} severity="error">{errorMessage}</Alert>:null}
                    <TextField id='email' label='Email' variant='outlined'
                        onChange={ typing }
                        value = {credential.email}
                        name = 'email'
                        sx={{margin:'5px', width:'20rem'}}
                    />
                    <TextField id='password' label='Password' variant='outlined'
                        onChange={ typing }
                        value = {credential.password}
                        name = 'password'
                        sx={{margin:'5px', width: '20rem'}}
                    />
                    <Button variant='contained' onClick={login} sx={{margin:'5px', width: '20rem'}}>Login</Button>
                </form>
            </Box>
        </Box>        
    );
};

export default Login;