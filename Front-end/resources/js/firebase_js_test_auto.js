/*var config = {
  apiKey: "AIzaSyBprXkeXD1HCJQZL4KtgmMaA3svUU7vcgI",
  authDomain: "collegechef-1789f.firebaseapp.com",
  databaseURL: "https://collegechef-1789f.firebaseio.com",
  //projectId: "collegechef-1789f",
  storageBucket: "collegechef-1789f.appspot.com",
  //messagingSenderId: "231942064234"
};
firebase.initializeApp(config);*/

function onChecked(id){
  var check = document.getElementById(id).checked;
  console.log(id);
  console.log(check);
  if (check == true){
    document.getElementById(id).value = "true";
  }
  else{
    document.getElementById(id).value = "false";
  }
  console.log(document.getElementById(id).value);

}

//var veg = document.getElementById("veget");
//veg.onchange() = onChecked();
/*if(veg){
  document.querySelector("input[name=vegetarian_option]").addEventListener('change', function(){
    var value = document.getElementById("veget").checked;
    console.log(value);
  });
}*/

function submit(){
  var veg = document.getElementById('veget').value;
  var vegan = document.getElementById('vegan').value;
  var gluten_free = document.getElementById('gf').value;
  var pesc = document.getElementById('pesc').value;

  if (veg == "true") {veg = true}
  else{veg = false}

  if (vegan == "true") {vegan = true}
  else (vegan = false)

  if (gluten_free=="true"){gluten_free = true}
  else { gluten_free = false }

  if (pesc == "true") { pesc = true }
  else {pesc = false}

  writeUserData(veg, vegan, gluten_free,pesc);


}


function writeUserData(veg, vegan, gluten_free, pesc) {

  var myFirebase = firebase.database().ref();
  var CurrentUser = firebase.auth().currentUser;
  var users = myFirebase.child('users');
  console.log(CurrentUser.uid);
  console.log(CurrentUser.email);

  if(CurrentUser){
    users.child(CurrentUser.uid).set( {
    "email":CurrentUser.email,
    "veg": veg,
    "vegan": vegan,
    "gluten_free":gluten_free,
    "pesc":pesc
    });
  }

  else{
    alert("Not Logged In! Please Login or Register!");
  }

  console.log("writeUserData finished")
}

//writeUserData("XMYKzifG7kMPk08tixxyqUaIFN83","quachdylan110@gmail.com","hello123",true, false, false, false);

//writeUserData("XMYKzifG7kMPk08tixxyqUaIFN82","casa0779@colorado.edu","hello1234",false, false, true, true);

/*var myFirebase = firebase.database().ref();
var users = myFirebase.child("users");
users.push( {
  "email":"casa0779@colorado.edu",
  "Password": "hello123",
  "veg": true,
  "vegan": false,
  "gluten_free":false,
  "pesc":false,
});*/
