import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAD2dJzrcd0YghrNAh8f3lgeUT-bnTnYvg',
  authDomain: 'react-cms-20e8a.firebaseapp.com',
  databaseURL: 'https://react-cms-20e8a.firebaseio.com',
  projectId: 'react-cms-20e8a',
  storageBucket: 'react-cms-20e8a.appspot.com',
  messagingSenderId: '862750705974',
};

const fire = firebase.initializeApp(config);

export default fire;
