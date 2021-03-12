import React, {useState, useContext} from 'react'
import "./style.css";
import { UserContext } from '../../contexts/user';
import { db } from '../../firebase';


function CommentInput({comments , id}) {



    const [user, setUser] = useContext(UserContext).user;

    const [comment, setComment] = useState("");
    
    const [commentArray, setCommentArray] = useState(comments ? comments : []);

    //add comment to database


    const addComment = () => {

        if(comment != ""){
              //add comment to post info
        commentArray.push({
            comment: comment,
            username: user.email.replace("@gmail.com",""),
        });


        db.collection("posts")
        .doc(id)
        .update({
            comments: commentArray,
        })
        .then(function(){
            setComment("");
        })

        }
      
    }

    return (
        <div className="commentInput">

            <textarea rows="1" className="commentInput__textarea" placeholder="Enter Comment" onChange={(e)=>setComment(e.target.value)} value={comment}>
                
            </textarea>

            <button className="commentInput__btn" onClick={addComment}>Post</button>
                
        </div>
    )
}

export default CommentInput
