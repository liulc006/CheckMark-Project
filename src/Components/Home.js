import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Login";
import ChecklistGrid from './ChecklistGrid';

const Home = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector(state => state);

    return (
        <>
            {auth._id ? 
            <>
                <h1>Welcome In {auth.firstName || auth.email}!</h1> 
                <ChecklistGrid/>
            </>
            :
            <Login/>
            }
        </>
    )
};

export default Home;