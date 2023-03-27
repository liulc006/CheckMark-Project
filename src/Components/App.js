import React, { useEffect, useState } from 'react';
import { TextField, Box, Button } from '@mui/material';
import axios from 'axios';

const App = () => {
    const [ credential, setCredential ] = useState({
        email: '',
        password: '',
    })

    const typing = ev => {
        setCredential({...credential, [ev.target.name]: ev.target.value})
    }

    const login = () => {
        console.log(credential)
        
    }

    return (
        <>
            <h1>Welcome</h1>

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

        </>
    );
};

export default App;
