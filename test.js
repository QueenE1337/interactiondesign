//When registrating: Loop through an array with users...

//Global array to store the true/false - have we found a correct login?
var found = false;

//For-loop, going through the arrays users
for (var i=0; < data.length; i++) {

  if ( data[i].username == written_username && data[i].pass == written_password ) {
    found = true;
    break;
  }
}

if (found == true ) {
  USER IS FOUND.
}




//Next example, using CHANGE:

//First, make sure the HTML document is loaded:
$(document).ready(function() {

  $("#section").change(function() {
    $("$form").toggleClass("moved");
  });

});
