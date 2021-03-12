import React, { useState, useContext } from 'react'
import SignInBtn from '../../components/signin-btn'
import { UserContext } from '../../contexts/user';
import "./style.css";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import makeid from '../../helper/functions';
import { db, storage } from '../../firebase';
import firebase from "firebase";

function CreatePost() {

    const [user, setUser] = useContext(UserContext).user;


    //state to save the comments
    const [caption, setCaption] = useState("");

    const [image, setImage] = useState(null);

    const [progress, setProgress] = useState(0);




    //handleChangeFunction
    const handleChange = (e) =>{
        if(e.target.files[0])
        {
            setImage(e.target.files[0]);

            var selectedImageSrc = URL.createObjectURL(e.target.files[0]);

            var imagePreview = document.getElementById("image-preview");

            imagePreview.src = selectedImageSrc;

            imagePreview.style.display = "block";
        }

    };

    const handleUpload = () =>{
        //we need to check if the image is selected
        if(image){
            var imageName = makeid(10);
            //handle random name generator for images
            const uploadTask = storage.ref(`images/${imageName}.jpg`)
            .put(image);

            uploadTask.on("state_changed", (snapshot)=>{
                const progress = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);

                setProgress(progress);

            }, (error) => {
                console.log(error);
            }, ()=>{
                //get the download url and upload the post info
                storage.ref("images")
                .child(`${imageName}.jpg`)
                .getDownloadURL()
                .then((imageUrl)=>{
                    db.collection("posts").add({
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        caption:  caption,
                        photoUrl: imageUrl,
                        username: user.email.replace("@gmail.com", ""),
                        profileUrl: user.photoURL, 
                    })
                })

                setCaption("");
                setProgress(0);
                setImage(null);

                document.getElementById("image-preview").style.display="none";

            });
        }

    };




    return (
        <div className="createPost">
           
           {    
                user ? 
                (
                    <div className="createPost__loggedIn"> 
                        <p>Create Post</p>
                        <div className="createPost__loggedInCenter">
                            <textarea className="createPost__textarea"
                                rows="3"
                                value={caption}
                                placeholder="enter caption here.."
                                onChange={(e)=> setCaption(e.target.value)}
                            />

                            <div className="createPost__imagePreview">
                                <img id="image-preview" alt=""/>
                            </div>

                            
                        </div>

                        <div className="createPost__loggedInBottom">

                        <div className="createPost__imageUpload">
                            <label htmlFor="fileInput">
                                <AddAPhotoIcon style={{ cursor:"pointer", fontSize:"20px"}}/>
                            </label>
                            <input id="fileInput" type="file"
                                accept="image/*"
                                onChange={handleChange}>
                                </input>
                        
                        </div>

                        <button className="createPost__uploadBtn" onClick={handleUpload}
                         style={{color: caption ? "#000" : "lightgrey" }}>
                         {`Upload ${progress != 0 ? progress : ""}`}
                         </button>

                        </div>

                      </div>
                ) 
                
                : 

                (
                    <div> 
                    <SignInBtn/>
                    <p>
                      to Post & Comment  
                    </p>
                </div>
                )
           }
            
        </div>
    )
}

export default CreatePost
