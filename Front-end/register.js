function checkpsw() {
    var pass1 = document.getElementById("inputPassword").value;
    var pass2 = document.getElementById("inputConfirmPassword").value;
    var good = true;
    if (pass1 != pass2) {
        alert("Passwords do not match");
        good = false;
    }
    return good;
}