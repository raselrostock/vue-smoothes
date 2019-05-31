import firebase from 'firebase';
import firestore from 'firebase/firestore';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDDB7AN2JhuGirRSp0s4mh2XkT5iXYQAZw',
  authDomain: 'vue-smoothes.firebaseapp.com',
  databaseURL: 'https://vue-smoothes.firebaseio.com',
  projectId: 'vue-smoothes',
  storageBucket: 'vue-smoothes.appspot.com',
  messagingSenderId: '458788028155',
  appId: '1:458788028155:web:73b176a0e0bee229'
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebaseApp.firestore().settings({ timestampsInSnapshots: true });
// export firestore database
export default firebaseApp.firestore();
