import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginWithToken } from '../store';
import { useSelector } from 'react-redux';
import Home from './Home';
import Nav from './Nav';
import { Routes, Route } from 'react-router-dom';


const App = () => {
    const dispatch = useDispatch();

    const { auth } = useSelector(state=>state);

    useEffect(()=>{
        //Runs at the beginning to check with you are logged in already
        dispatch(loginWithToken());
    }, []);

    return (
        <>
            <Nav/>
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='*' element={<h1>Error! Go Back</h1>} />
            </Routes>
        </>
    );
};

export default App;
