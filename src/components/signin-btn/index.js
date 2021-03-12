import React, { useContext } from 'react'
import "./style.css";

import {signInWithGoogle} from "../../services/auth";
import { UserContext } from '../../contexts/user';

function SignInBtn() {

    const [user, setUser] = useContext(UserContext).user;

    //function to handle sign in Button click
    const signInButtonClick = async () =>{
        let userBySignIn = await signInWithGoogle();
        //so if user signed in then
        if(userBySignIn) setUser(userBySignIn);
        
    };

    return (
        <div className="signInBtn" onClick={signInButtonClick}>
            <p>Sign In with Google</p>
        </div>
    )
}

export default SignInBtn
