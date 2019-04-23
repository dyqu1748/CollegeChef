function onLoad(){
  console.log("Called onLoad");
  var ref = firebase.database().ref("users");
  var CurrentUser = firebase.auth().currentUser;
  console.log(CurrentUser.uid);
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

    // Checks all of user's previously selected preferences on page load
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
}

// Sets values of preferences for submission 
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

// Disables buttons upon submission, calls function to write users new preferences
function submit(){
  document.getElementById('veget').disabled = true;
  document.getElementById('vegan').disabled = true;
  document.getElementById('gf').disabled = true;
  document.getElementById('pesc').disabled = true;
  $(".overlay").fadeIn("slow");
  $(".overlay").css("display", "block");


  setTimeout(writeUserData, 500);
}

// Checks values of preferences, then sets user database values of current user to the new values set by user
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
}
