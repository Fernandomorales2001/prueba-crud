import * as firebase from 'firebase';

    var firebaseConfig = {
      apiKey: "AIzaSyBuaoGAgkXM8OpL3uji8r106hVBYVDckN0",
      authDomain: "crud-react-firebase-b2504.firebaseapp.com",
      databaseURL: "https://crud-react-firebase-b2504-default-rtdb.firebaseio.com",
      projectId: "crud-react-firebase-b2504",
      storageBucket: "crud-react-firebase-b2504.appspot.com",
      messagingSenderId: "18562759642",
      appId: "1:18562759642:web:a4e638798c7f46368bdee3"
    };
    // Initialize Firebase
    var fireDB=firebase.initializeApp(firebaseConfig);
  export default fireDB.database().ref();