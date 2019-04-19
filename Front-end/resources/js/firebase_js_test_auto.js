/*var config = {
  apiKey: "AIzaSyBprXkeXD1HCJQZL4KtgmMaA3svUU7vcgI",
  authDomain: "collegechef-1789f.firebaseapp.com",
  databaseURL: "https://collegechef-1789f.firebaseio.com",
  //projectId: "collegechef-1789f",
  storageBucket: "collegechef-1789f.appspot.com",
  //messagingSenderId: "231942064234"
};
firebase.initializeApp(config);*/


function onLoad(){
  console.log("Called onLoad");
  var ref = firebase.database().ref("users");
  var CurrentUser = firebase.auth().currentUser;
  console.log(CurrentUser.uid);
  // want to implement some code that waits for them to sign in. Possibly work with dylan
  var uID = CurrentUser.uid;

  ref.once("value").then( function(snapshot) {
    var veget = snapshot.child(uID).child('veg').val();
    var gf = snapshot.child(uID).child('gluten_free').val();
    var vegan = snapshot.child(uID).child('vegan').val();
    var pesca = snapshot.child(uID).child('pesc').val();
    console.log("vegetarian: " + veget);
    console.log("gluten free: " + gf);
    console.log("vegan: " + vegan);
    console.log("pes: "+pesca);

    if (veget) {
      document.getElementById("veget").checked = true;
      document.getElementById("veget").value = "true";
    }
    if (gf){
      document.getElementById("gf").checked = true;
      document.getElementById("gf").value = "true";
    }
    if (vegan) {
      document.getElementById("vegan").checked = true;
      document.getElementById("vegan").value = "true";
    }
    if (pesca) {
      document.getElementById("pesc").checked = true;
      document.getElementById("pesc").value = "true";
    }

  }, function (error) {
    console.log("Error: "+error.code);
  });

  /*var users = myFirebase.child('users');
  //console.log(CurrentUser.uid);



  //svar myUser = users.child(CurrentUser.uid);
  var Veg = users.child(CurrentUser.veg);
  console.log(Veg);

  if(Veg){
    document.getElementById("veget").checked = true;
  }
  else {
    document.getElementById("veget").checked = false;
  }

  var Gluten_Free = users.child(CurrentUser.gluten_free);
  if(Gluten_Free){
    document.getElementById("gf").checked = true;
  }

  var Vegan = users.child(CurrentUser.vegan);
  if(Vegan){
    document.getElementById("vegan").checked = true;
  }

  var Pesc = users.child(CurrentUser.pesc);
  if(Pesc){
    document.getElementById("pesc").checked = true;
  }*/

}

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
  //document.getElementsByClassName('btn').disabled = true;
  //document.getElementById('veget').style.background-color = "B9BEC5";
  //alert("Thank you! Your preferences have been submitted!");
  document.getElementById('veget').disabled = true;
  document.getElementById('vegan').disabled = true;
  document.getElementById('gf').disabled = true;
  document.getElementById('pesc').disabled = true;
  $(".overlay").fadeIn("slow");
  $(".overlay").css("display", "block");


  setTimeout(writeUserData, 500);

  //window.location.href = "../views/home.html";
}


function writeUserData() {


  var veg = document.getElementById('veget').value;
  var vegan = document.getElementById('vegan').value;
  var gluten_free = document.getElementById('gf').value;
  var pesc = document.getElementById('pesc').value;
  console.log("vegetarian: " + veg);
  console.log("gluten free: " + gluten_free);
  console.log("vegan: " + vegan);
  console.log("pesc: "+pesc);

  if (veg == "true") {
    veg = true;
    //document.getElementById('veget').style.background-color = "B9BEC5";
  }
  else{veg = false}

  if (vegan == "true") {vegan = true}
  else (vegan = false)

  if (gluten_free=="true"){gluten_free = true}
  else { gluten_free = false }

  if (pesc == "true") { pesc = true }
  else {pesc = false}

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
    })
    .then(function() {
      alert("Thank you! Your preferences have been submitted!");
      window.location.href = "../views/home.html";
    })
    .catch(function() {
      console.log("Data was not written");
    });
  }

  else{
    alert("Not Logged In! Please Login or Register!");
  }

  console.log("writeUserData finished")
  //window.location.href = "../views/home.html";
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
