import React from "react";

const Nav = () => {
    return (
        <div style={{display:'flex', flexDirection:'row', border:'1px solid black'}}>
            <img style={{height:'10vh'}} alt='Logo' src="../static/Nav-Logo.png"/>
            <h1>Nav Bar: Welcome to CheckMark</h1>
        </div>
    )
}

export default Nav;