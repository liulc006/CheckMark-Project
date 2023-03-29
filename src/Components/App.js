import React, { useEffect, useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import axios from 'axios';

const App = () => {
    const [ credential, setCredential ] = useState({
        email: '',
        password: '',
    });

    const [ auth, setAuth ] = useState()

    let token = window.localStorage.getItem('token');

    const typing = ev => {
        setCredential({...credential, [ev.target.name]: ev.target.value})
    }

    const loggingWithToken = async(token) => {
        //Authorization => Logging in
        const user = await axios.get('/api/auth', {
            headers:{
                authorization: token
            }
        });
        setAuth(user.data);
    };

    const attemptLogin = async() => {
        //Authentication => Getting the token
        const token= await axios.post('/api/auth', credential);
        window.localStorage.setItem('token', token.data);
        await loggingWithToken(token.data);
    };

    const logout = () => {
        window.localStorage.removeItem('token');
        setAuth()
        //clear the credentials
        setCredential({email: '', password: ''})    
        
    };

    useEffect(()=>{
        const fetchAuth= async(token) => {
            await loggingWithToken(token);
        }
        if(token){
            fetchAuth(token);
        }
    }, [])

    return (
        <>
            <h1>Welcome</h1>
            {auth?.email ? 
            <>
                <h1>Hello {auth.email}</h1>
                <Button variant='contained' onClick={logout} sx={{margin:'5px'}}>Logout</Button>
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
                <Button variant='contained' onClick={attemptLogin} sx={{margin:'5px'}}>Login</Button>
            </form>
            }
        </>
    );
};

export default App;
