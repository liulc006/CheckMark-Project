import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { createUser } from '../store';
import { TextField, Box, Button, Alert, Typography, InputAdornment, IconButton, InputLabel, OutlinedInput, FormControl } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ credential, setCredential ] = useState({
        email: '',
        password: '',
        firstName:'',
        lastName:'',
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const typing = ev => {
        setCredential({...credential, [ev.target.name]: ev.target.value});
    };

    //variable to view/hide password
    const [ view, setView ] = useState(false);

    const handleClickShowPassword = () => setView((view) => !view);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const signup = (ev) => {
        ev.preventDefault();
        setErrorMessage(null);
        credential.email = credential.email.toLowerCase();
        dispatch(createUser(credential, navigate))
            .catch((err)=> {
                if(err.response.status === 500){
                    setErrorMessage('Email Already in Use! Please Use Another Email!')
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
            <Box sx={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                <Box component='img' src='../static/Nav-Logo.png'
                sx={{height:'2rem', objectFit: 'contain', zIndex:'1'}}
                />
                <form style={{display:'flex', flexDirection:'column', margin:'5px', alignItems:'center', border:'black 1px solid', backgroundColor:'white',
                    borderRadius:'2%', padding:'2rem', marginTop:'15rem'
                }}>
                    <Typography variant='h4'>Register</Typography>
                    {errorMessage ? <Alert sx={{width:'100%'}} severity="error">{errorMessage}</Alert>:null}
                    <Box sx={{display:'flex', flexDirection:'row', width:'20rem'}}>
                        <TextField id='firstName' label='First Name' variant='outlined'
                            onChange={ typing }
                            value = {credential.firstName}
                            name = 'firstName'
                            sx={{margin:'5px', marginLeft:'0'}}
                        />
                        <TextField id='lastName' label='Last Name' variant='outlined'
                            onChange={ typing }
                            value = {credential.lastName}
                            name = 'lastName'
                            sx={{margin:'5px', marginRight:'0'}}
                        />
                    </Box>
                    <TextField id='email' label='Email' variant='outlined'
                        onChange={ typing }
                        value = {credential.email}
                        name = 'email'
                        sx={{margin:'5px', width:'20rem'}}
                        required
                    />
                    <FormControl sx={{margin:'5px', width: '20rem'}} 
                        variant="outlined"
                        value = {credential.password}
                        onChange={ typing }
                        required
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
                            name='password'
                            type={view ? 'text' : 'password'}
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
                    <Button variant='contained' onClick={signup} sx={{margin:'5px', width: '20rem'}}>Sign Up</Button>
                    <Link to='/' >Back to Login</Link>
                </form>
            </Box>
        </Box>    
    );
};

export default Register;