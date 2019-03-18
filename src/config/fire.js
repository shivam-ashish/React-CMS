import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAD2dJzrcd0YghrNAh8f3lgeUT-bnTnYvg',
  authDomain: 'react-cms-20e8a.firebaseapp.com',
  databaseURL: 'https://react-cms-20e8a.firebaseio.com',
  projectId: 'react-cms-20e8a',
  storageBucket: 'react-cms-20e8a.appspot.com',
  messagingSenderId: '862750705974',
};

// var config = {
//   apiKey: "AIzaSyATNgalgLToEwmRh01gDNJhcqIpO88Cb-U",
//   authDomain: "react-cms-5d62b.firebaseapp.com",
//   databaseURL: "https://react-cms-5d62b.firebaseio.com",
//   projectId: "react-cms-5d62b",
//   storageBucket: "",
//   messagingSenderId: "609905714877"};

const fire = firebase.initializeApp(config);

export default fire;
