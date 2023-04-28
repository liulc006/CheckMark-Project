import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginWithToken } from '../store';
import { useSelector } from 'react-redux';
import Home from './Home';
import Nav from './Nav';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import AccountProfile from './AccountProfile';
import AccountProfileUpdate from './AccountProfileUpdate';
import AccountPasswordUpdate from './AccountPasswordUpdate';

const App = () => {
    const dispatch = useDispatch();

    const { auth } = useSelector(state=>state);

    useEffect(()=>{
        //Runs at the beginning to check with you are logged in already
        dispatch(loginWithToken());
    }, []);

    return (
        <>
            {auth._id? <Nav/>:null}
            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/register' element={<Register/>}/>
                <Route path='/account/:id' element={<AccountProfile />} />
                <Route path='/account/:id/update' element={<AccountProfileUpdate />} />
                <Route path='/account/:id/update_password' element={<AccountPasswordUpdate/>} />
                <Route path='*' element={<h1>Error! Go Back</h1>} />
            </Routes>
        </>
    );
};

export default App;
