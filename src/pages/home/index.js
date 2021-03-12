import React from 'react'
import SignInBtn from '../../components/signin-btn'
import Navbar from "../../containers/navbar";
import "./style.css"
import CreatePost from "../../containers/create-post";
import Feed from '../../containers/feed';


function Home() {
    return (
        <div className="home">
            <Navbar/>
            <CreatePost/>
            <Feed/>
            
        </div>
    )
}

export default Home
