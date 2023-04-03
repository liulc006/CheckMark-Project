import React, { useEffect } from 'react';
import { Button, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout, loginWithToken } from '../store';
import { useSelector } from 'react-redux';
import {Login} from './Login';
import { Routes, Route } from 'react-router-dom';


const App = () => {
    const dispatch = useDispatch();

    const { auth } = useSelector(state=>state);

    const loggingOut = (ev) => {
        dispatch(logout());
    };

    useEffect(()=>{
        //Runs at the beginning to check with you are logged in already
        dispatch(loginWithToken());
    }, []);

    return (
        <>
            <h1 style={{position:'absolute', color:'white', marginLeft:'15vw'}}>Welcome to CheckMark </h1>

            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path='*' element={<h1>Error! Go Back</h1>} />
            </Routes>
        </>
    );
};

export default App;
