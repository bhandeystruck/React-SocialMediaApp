import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAyKU3AgEg03pPDTUfZc-BOrtrBMOgIsVk",
    authDomain: "react-socialmedia-3c706.firebaseapp.com",
    projectId: "react-socialmedia-3c706",
    storageBucket: "react-socialmedia-3c706.appspot.com",
    messagingSenderId: "699386110005",
    appId: "1:699386110005:web:57b0027aa350680508517c",
    measurementId: "G-N8BLMQWQEF"
  };

  //initializing the app with the configs
  const firebaseApp = firebase.initializeApp(firebaseConfig);

  //importing the database functionalities 
  const db = firebaseApp.firestore();

  const auth = firebase.auth();

  const storage = firebase.storage();
  
  const provider = new firebase.auth.GoogleAuthProvider();


export {db,auth,provider,storage};
