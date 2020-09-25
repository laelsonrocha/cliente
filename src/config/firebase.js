import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBLL4LTOkHGothRoqe1zQuUdbjSqS_5ZmA",
    authDomain: "eventos-6ca05.firebaseapp.com",
    databaseURL: "https://eventos-6ca05.firebaseio.com",
    projectId: "eventos-6ca05",
    storageBucket: "eventos-6ca05.appspot.com",
    messagingSenderId: "88061134735",
    appId: "1:88061134735:web:36e050be0783ec003b2dfa"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);