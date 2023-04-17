import React, {useState} from "react";
import { useDispatch } from 'react-redux';
import { attemptLogin } from '../store';
import { TextField, Box, Button, Alert, Typography, InputAdornment, IconButton, InputLabel, OutlinedInput, FormControl } from '@mui/material';
import { Link } from 'react-router-dom';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Register = () => {
    const dispatch = useDispatch();

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
                    />
                    <FormControl sx={{margin:'5px', width: '20rem'}} 
                        variant="outlined"
                        value = {credential.password}
                        onChange={ typing }
                    >
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            id="password"
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
                    <Button variant='contained' onClick={login} sx={{margin:'5px', width: '20rem'}}>Sign Up</Button>
                    <Link to='/' >Back to Login</Link>
                </form>
            </Box>
        </Box>    
    );
};

export default Register;