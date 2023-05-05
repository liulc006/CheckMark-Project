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
import Footer from './Footer';
import ChecklistGrid from './ChecklistGrid';

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
                <Route path='/checklist' element={<ChecklistGrid/>} />
                <Route path='/register' element={<Register/>}/>
                <Route path='/account/:id' element={<AccountProfile />} />
                <Route path='/account/:id/update' element={<AccountProfileUpdate />} />
                <Route path='/account/:id/update_password' element={<AccountPasswordUpdate/>} />
                <Route path='*' element={<div style={{height:'calc(90vh - 4rem)'}}><h1>Error! Go Back</h1></div>} />
            </Routes>
            <Footer/>
        </>
    );
};

export default App;
