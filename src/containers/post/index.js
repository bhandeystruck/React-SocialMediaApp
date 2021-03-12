import React,{useContext} from 'react';

import { UserContext } from '../../contexts/user';

import Comment from "../../components/comment/index";

import "./style.css";
import { db, storage } from '../../firebase';
import CommentInput from '../../components/comment-input';

function Post({profileUrl, username, id, photoURL, caption, comments}) {


    const [user, setUser] = useContext(UserContext).user;

    const deletePost =() =>{
        //delete image


        //get the reference to the url image
        var imageRef = storage.refFromURL(photoURL);

        imageRef.delete().then(function(){
            console.log("deleted");
        })
        .catch(function(error){
            console.log(error);
        });


        //delete post info from firebase
        db.collection("posts").doc(id).delete()
        .then(function(){
            console.log("deleted info")
        })
        .catch(function(error){
            console.log(error);
        });


    };




    return (
        <div className="post">

            <div className="post__header">
            <div className="post__headerLeft">
                <img className="post__profilePic" src={profileUrl} alt=""/>
                <p style={{ marginLeft:"8px" }} > {username} </p>
            </div>
                
                <button className="post__delete" onClick={deletePost}>Delete</button>
            </div>
                
            <div className="post__Center">
                <img className="post__photoUrl" src={photoURL} alt=""/>
            </div>

            <div>

                <p>
                <span style={{fontWeight:"500", marginRight:"4px"}}>
                
                {username}

                </span>

                {caption}
                
                
                </p>


            </div>


            {comments ? (comments.map((comment) => 
               <Comment username={comment.username} caption={comment.comment}/>
               ))
               : ( <></>)}
               

               {user ? <CommentInput comments={comments} id={id}/> : <> </>}
            

        </div>
    );
}

export default Post
