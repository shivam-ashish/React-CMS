import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCSjK0ElDeKM4HhzBDmN1rW75GOeh_zM4I',
  authDomain: 'react-cms-f61b8.firebaseapp.com',
  databaseURL: 'https://react-cms-f61b8.firebaseio.com',
  projectId: 'react-cms-f61b8',
  storageBucket: '',
  messagingSenderId: '916097412424',
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
