import React, { useState , useContext } from 'react'
import SignInBtn from '../../components/signin-btn';
import { UserContext } from '../../contexts/user';
import "./style.css";

function Navbar() {

    const [user, setUser] = useContext(UserContext).user;
    return (
        <div className="navbar">
            <p>React Social Media App</p>

            {/* Ig User is logged in then show image*/}

            {
                user ? <img className="navbar__img" src={user.photoURL} alt="" /> :  <SignInBtn/>
            }

           
            
        </div>
    )
}

export default Navbar
