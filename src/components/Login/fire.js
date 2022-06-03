  import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyA5S_bIDk2yAH9fsHnUGIlLDu3pCPikE-E",
  authDomain: "onemore-f7b99.firebaseapp.com",
  projectId: "onemore-f7b99",
  storageBucket: "onemore-f7b99.appspot.com",
  messagingSenderId: "995596521484",
  appId: "1:995596521484:web:f5fc6a03e49efb05f29e29"
};

  const fire = firebase.initializeApp(firebaseConfig)

  export default fire;