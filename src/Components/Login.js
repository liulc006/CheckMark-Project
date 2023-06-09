import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { attemptLogin } from '../store';
import { TextField, Box, Button, Alert, Typography, InputAdornment, IconButton, InputLabel, OutlinedInput, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
    const dispatch = useDispatch();
    
    //variable to view/hide password
    const [ view, setView ] = useState(false);

    //Login credentials
    const [ credential, setCredential ] = useState({
        email: '',
        password: '',
    });

    //Error message from Login
    const [errorMessage, setErrorMessage] = useState(null);

    //handle changes in typing
    const typing = ev => {
        setCredential({...credential, [ev.target.name]: ev.target.value});
    };

    const handleClickShowPassword = () => setView((view) => !view);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    //Submit to => Authentification => Authorization => logged in
    const login = (ev) => {
        ev.preventDefault();
        setErrorMessage(null);
        credential.email = credential.email.toLowerCase();
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
        <Box sx={{height:'100vh'}}>
            <Box component='img' 
                alt='background-image'
                src='../static/todolist.jpg'
                sx={{height: '100vh', width:'100%', objectFit: 'cover', position:'absolute', zIndex:'-1'}}
            />
            <Box sx={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Box component='img' src='../static/Nav-Logo.png'
                    sx={{height:'2rem', objectFit: 'contain', zIndex:'1'}}
                />
                <FormControl onSubmit={login} sx={{display:'flex', flexDirection:'column', margin:'5px', alignItems:'center', border:'black 1px solid', backgroundColor:'white',
                    borderRadius:'2%', padding:'2rem', marginTop:'15rem', maxWidth: {xs:250, md:400}
                }}>
                    <Typography variant='h5' sx={{textAlign:'center'}}>Welcome to CheckMark!</Typography>
                    <Typography variant='h4'>User Login</Typography>
                    {errorMessage ? <Alert sx={{width:'100%'}} severity="error">{errorMessage}</Alert>:null}
                    <TextField id='email' label='Email' variant='outlined'
                        onChange={ typing }
                        value = {credential.email}
                        name = 'email'
                        sx={{margin:'5px', width:'95%'}}
                    />
                    <FormControl sx={{margin:'5px', width: '95%'}} 
                        variant="outlined"
                        value = {credential.password}
                        onChange={ typing }
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            type={view ? 'text' : 'password'}
                            name='password'
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {view ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                            variant='outlined'
                        />
                    </FormControl>
                    <Button type='submit 'variant='contained' onClick={login} sx={{margin:'5px', width: '95%'}}>Login</Button>
                    <Link to='/register' style={{textAlign:'center'}}>Don't Have an Account? Register Here</Link>
                </FormControl>
            </Box>
        </Box>        
    );
};

export default Login;