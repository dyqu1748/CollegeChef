(function(){
  const config = {
    apiKey: "AIzaSyBprXkeXD1HCJQZL4KtgmMaA3svUU7vcgI",
    authDomain: "collegechef-1789f.firebaseapp.com",
    databaseURL: "https://collegechef-1789f.firebaseio.com",
    projectId: "collegechef-1789f",
    storageBucket: "collegechef-1789f.appspot.com",
    messagingSenderId: "231942064234"
    };
  firebase.initializeApp(config);

  const Email = document.getElementById('inputEmail');
  const Password = document.getElementById('inputPassword');
  
  //Add login event
  btnLogIn.addEventListner('click', e => {
    //Get email and pass
    const email = Email.value;
    const pass = Password.value;
    const auth = firebase.auth();
    //Sing in
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
    
  });

  btnRegister.addEventListner('click', e => {
    //Get email and pass
    const email = Email.value; 
    //TODO: check 4 real email (firebase does not do this)
    const pass = Password.value;
    const auth = firebase.auth();
    //Create User
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise
      .catch(e => console.log(e.message)); 
  });

  //Add a realtime listner
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      console.log(firebaseUser);
    }
    else{
      console.log('not logged in');
    }
  }); 

  //Database

  //get element
  const preObject = document.getElementById('object');

  //Create references
  const dbRefObject = firebase.database().ref().child('object');

  //SYNC OBJECT CHANGES
  dbRefObject.on('value', snap => console.log(snap.val())); 

})