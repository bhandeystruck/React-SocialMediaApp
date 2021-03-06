import React, {useState, useEffect} from 'react'
import Post from "../../containers/post/index";
import "./style.css";
import {db} from "../../firebase";


function Feed() {

    const [posts, setPosts] = useState([]);

    /// useEffect -> runs a piece of code baded on a specific condition
    useEffect(() => {
        // this is where the code runs
        db.collection("posts").onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
        });
    }, []);

    return (
        <div className="feed">
            {posts.map(({id,post})=>{
                return <Post
                    key={id}
                    id={id}
                    profileUrl={post.profileUrl}
                    username={post.username}
                    photoURL={post.photoUrl}
                    caption={post.caption}
                    comments={post.comments}
                />

            })}
            
        </div>
    )
}

export default Feed
