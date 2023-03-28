import React, { useEffect, useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import axios from 'axios';

const App = () => {
    const [ credential, setCredential ] = useState({
        email: '',
        password: '',
    });

    const [ auth, setAuth ] = useState()

    const typing = ev => {
        setCredential({...credential, [ev.target.name]: ev.target.value})
    }

    const login = async() => {
        //Authentication => Getting the token
        const token= await axios.post('/api/auth', credential);
        console.log(token.data)
        window.localStorage.setItem('token', token.data);

        //Authorization => Logging in
        const user = await axios.get('/api/auth', {
            headers:{
                authorization: token.data
            }
        });
        setAuth(user.data)
    }

    return (
        <>
            <h1>Welcome</h1>
            {auth?.email ? 
            <h1>Hello {auth.email}</h1>
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
