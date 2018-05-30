var transEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";

//Save all info from registration in global variables
var firstname = $("#firstname").val();
var lastname = $("#password").val();
var svnumber = $("#svnumber").val();
var cityOther = $("#cityOther").val();
var workplaceOther = $("#workplaceOther").val();



$(document).ready(function() {

	setTimeout(function(){
   $('#welcomemessage').addClass("showwelcome");
 }, 1000);

	setTimeout(function(){
		$('#welcomemessage').removeClass("showwelcome");
   $('#welcomemessage').addClass("removewelcome");
 }, 4000);

	// Open the login modal
	$("a.open-modal").on("click", function(e) {
		e.preventDefault();

		$("body").addClass("modal-showing");
		$("nav, #hamburger-button").removeClass("clicked");
	});

	// Open register pop-up on click
	$("a.openRegister").on("click", function(e) {
		e.preventDefault();

		$("body").addClass("register-showing");
		$("body").removeClass("modal-showing");
		$("#firststep input, #firststep a").removeAttr("tabindex");
	});

	// Open the event modal
	$("a.open-eventmodal").on("click", function(e) {
		e.preventDefault();

		$("body").addClass("modal-showing");
		$("nav, #hamburger-button").removeClass("clicked");
	});

	$("a#educationLink").on("click", function(){
		$(".educationMenuHidden, .educationMenu").toggleClass("educationMenuHidden educationMenu");
		$("#educationLi").addClass("liShowing");
		// $(".educationMenuHidden").removeClass("educationMenuHidden");
	});



	// CLOSE LOGIN MODAL ON CANCEL ( X )
	$(".modal-container, #modal .cancel").on("click", function(e) {
		e.preventDefault();

		var fields = $("#loginform").find("*[required]");
		fields.removeClass("error");

		$("body").addClass("closing");


		$(".modal-container #modal").one(transEnd, function() {

			$("body").removeClass("modal-showing closing");
			$(this).off(transEnd);
		});
	})

	//REMOVING REGISTER ON CANCEL ( X )
	$(".register-container, #register .cancel").on("click", function(e) {
		e.preventDefault();
		$("body").addClass("closing");


		$(".register-container #register").one(transEnd, function() {

			$("body").removeClass("register-showing closing");
			$(this).off(transEnd);
		});
	})

	// CLOSE EVENT MODAL ON CANCEL ( X )
	$(".modal-container, #eventmodal .cancel, #eventmodal #doneButton").on("click", function(e) {
		close(e);
	});

	function close(e){
		e.preventDefault();

		var fields = $("#loginform").find("*[required]");
		fields.removeClass("error");

		$("body").addClass("closing");


		$(".modal-container #eventmodal").one(transEnd, function() {

			$("body").removeClass("modal-showing closing");
			$(this).off(transEnd);
		});

		$(".modal-container #eventmodal").one(transEnd, function() {

			$("#eventmodal").removeClass("confirmation");
			$(this).off(transEnd);
		});
	}


	// but NOT on clicks in the modal (=prevent "bubbling")
	$("#modal").on("click", function(e) {
		e.stopPropagation();
	});

	$("#register").on("click", function(e) {
		e.stopPropagation();
	});

	$("#eventmodal").on("click", function(e) {
		e.stopPropagation();
	});


	//REGISTRATION Back buttons

	//BACK STEP TWO --> ONE
	$("#back-to-step1").on("click", function(e) {
	  e.preventDefault();

	  $("#register").addClass("back-step1");
	  $("#register").removeClass("step2");
	  $("#register").removeClass("back-step2");
	  $("#register").removeClass("step3");
	  $("#progressContainer").removeClass("step2");
	})

	//BACK STEP THREE --> TWO
	$("#back-to-step2").on("click", function(e) {
	  e.preventDefault();

	  $("#register").addClass("back-step2");
	  $("#register").removeClass("step3");
	  $("#progressContainer").removeClass("step3");
	})


// on change-event of <select>, do stuff:
$("#profession").change(function() {

		// save the chosen value
		var val = $(this).find("option:selected").attr("value");

		// clear "show"-class first to make sure a change from "student" to another option = additional fields are hidden again
		$(".doctor").removeClass("show");
		$(".other").removeClass("show");

		// has the user shosen the option "Doctor"?
		if ( val=="Doctor") {

			// yes, add class "show" and let special CSS for this show the hidden fields
			$(".doctor").addClass("show");
			$(".doctor input, .doctor select, .doctor a").removeAttr("tabindex");
		}

		// has the user shosen a option other than Doctor??
		if ( val=="Nurse" || val=="Physiotherapist" || val=="themeaningoflife" ) {

			// yes, add class "show" and let special CSS for this show the hidden fields
			$(".other").addClass("show");
			$(".other input, .other select, .other a").removeAttr("tabindex");
		}
	});


	// SLIDING THE EVENT INFORMATION - TO CONFIRMATION:
	$("a.event-button").on("click", function(e) {
		e.preventDefault();

		$("#eventmodal").addClass("confirmation");
		$("#event input").removeAttr('tabindex');
	});



// FUNTIONALITY FOR THE TABS BELOW!!
// ----------------------------------------------

	$('ul.tabs').each(function(){
  // For each set of tabs, we want to keep track of
  // which tab is active and its associated content
  var $active, $content, $links = $(this).find('a');

  // If the location.hash matches one of the links, use that as the active tab.
  // If no match is found, use the first link as the initial active tab.
  $active = $($links.filter('[href="'+location.hash+'"]')[0] || $links[0]);
  $active.addClass('active');

  $content = $($active[0].hash);

  // Hide the remaining content
  $links.not($active).each(function () {
    $(this.hash).hide();
  });

  // Bind the click event handler
  $(this).on('click', 'a', function(e){
    // Make the old tab inactive.
    $active.removeClass('active');
    $content.hide();

    // Update the variables with the new link and content
    $active = $(this);
    $content = $(this.hash);

    // Make the tab active.
    $active.addClass('active');
    $content.show();

    // Prevent the anchor's default click action
    e.preventDefault();
  });
});

//Form validation

$("#loginform").submit( function(e) {
	var postform = true;
	var fields = $(this).find("*[required]");

	fields.removeClass("error");

	fields.each(function() {
		var type = $(this).attr("type");
		var val = $(this).val();

		if (type == "text") {
			if (val === undefined || val == null || val == "") {
				postform = false;
				$(this).addClass("error");
			}
		} else if (type == "password") {
			if (val === undefined || val == null || val == "") {
				postform = false;
				$(this).addClass("error");
			}
		}
	});
	if (!postform) {
		e.preventDefault();
	}
});

$("#form-one").submit( function(e) {
	e.preventDefault();
	var postform = true;
	var formOneFields = $("#form-one").find("*[required]");

	//Save all info from registration in global variables
	var firstname = $("#firstname").val();
	var lastname = $("#lastname").val();

	formOneFields.removeClass("error");

	formOneFields.each(function() {
		var type = $(this).attr("type");
		var val = $(this).val();

		if (type == "text" && [name='firstname']) {
			if (val === undefined || val == null || val == "") {
				postform = false;
				$(this).addClass("error");
			}
		} else if (type == "text" && [name='lastname']) {
			if (val === undefined || val == null || val == "") {
				postform = false;
				$(this).addClass("error");
			}
		}
	});

	//Getting the json file to work with ajax.
	$.ajax({
		url: "js/users.json",
		dataType: "json"
	})
	.done(function(data) {
		console.log("data: ", data);
		var userInfo = getUserInfo( firstname, lastname, data );

		console.log("userInfo: ", userInfo);

	})
	.fail(function( jqXHR, textStatus, errorThrown ) {
		console.log(errorThrown);
	});


	if (!postform) {
		e.preventDefault();
	} else {
		//WHAT SHOULD HAPPEN?
	}

});



//FUNCTION compare the user information in the form with the json file
function getUserInfo( firstname, lastname, json ) {

	var correctUser = null;

	for (var i = 0; i < json.length; i++) {
		var userinfo = json[i];
		//If theres a match: form username to json username && form password to json password
		if ( firstname == userinfo.firstName && lastname == userinfo.lastName ) {
			//Save that information in a new varible.
			var correctUser = userinfo;

			$("#register").removeClass("back-step1");
			$("#register").addClass("step2");
			$("#profession, #secondstep a").removeAttr("tabindex");
			$("#progressContainer").addClass("step2");

			break;
		}
	}
	return correctUser;
}


$("#form-two").submit( function(e) {
	e.preventDefault();
	var postform = true;
	var formTwoFields = $("#form-two").find("*[required]");

	//Save all info from registration in global variables
	var svnumber = $("#svnumber").val();

	formTwoFields.removeClass("error");

	formTwoFields.each(function() {
		var type = $(this).attr("type");
		var id = $(this).attr("id");
		var val = $(this).val();

		if ($("#noProfession").is(':selected')) {
				postform = false;
				$("#profession").addClass("error");
		} else if ($("#doctor").is(':selected')) {
			if (type == "number") {
				if (val === undefined || val == null || val == "") {
					postform = false;
					$(this).addClass("error");
				}
			} else if (type == "text" && id == "cityDr") {
				if (val === undefined || val == null || val == "") {
					postform = false;
					$(this).addClass("error");
				}
			} else if (type == "text" && id == "workplaceDr") {
				if (val === undefined || val == null || val == "") {
					postform = false;
					$(this).addClass("error");
				}
		} else if (!$("#doctor").hasClass("error") && $("#noSpecialityDr").is(':selected')) {
				postform = false;
				$("#speciality").addClass("error");
		}
	} else if ($(".other").is(':selected')) {
		if (type == "text" && id == "cityOther") {
			if (val === undefined || val == null || val == "") {
				postform = false;
				$(this).addClass("error");
			}
		} else if (type == "text" && id == "workplaceOther") {
			if (val === undefined || val == null || val == "") {
				postform = false;
				$(this).addClass("error");
			}
		} else if (!$(".other").hasClass("error") && $("#noSpecialityOther").is(':selected')) {
				postform = false;
				$("#specialityOther").addClass("error");
		}
	}
	});


	if (!postform) {
		e.preventDefault();
	} else {

		var correctSV = null;

		if (svnumber == correctUser.svnumber) {
			var correctSV = userinfo;

			$("#register").addClass("step3");
			$("#register").removeClass("step2");
			$("#register").removeClass("back-step2");
			$("#thirdstep input, #thirdstep a").removeAttr("tabindex");
			$("#progressContainer").addClass("step3");

			return correctSV;
		}


		/*
		//Getting the json file to work with ajax.
		$.ajax({
			url: "js/users.json",
			dataType: "json"
		})
		.done(function(data) {
			console.log("data: ", data);
			var userInfo = getSVInfo( svnumber, data );

			console.log("userInfo: ", userInfo);

		})
		.fail(function( jqXHR, textStatus, errorThrown ) {
			console.log(errorThrown);
		});
		*/

		}
});

/*
//FUNCTION compare the user information in the form with the json file
function getSVInfo( svnumber, json ) {

	var correctUser = null;

	for (var i = 0; i < json.length; i++) {
		var userinfo = json[i];
		//If theres a match: form username to json username && form password to json password
		if ( svnumber == userinfo.svnumber ) {
			//Save that information in a new varible.
			var correctUser = userinfo;

			$("#register").addClass("step3");
			$("#register").removeClass("step2");
			$("#register").removeClass("back-step2");
			$("#thirdstep input, #thirdstep a").removeAttr("tabindex");
			$("#progressContainer").addClass("step3");

			break;
		}
	}
	return correctUser;
}
*/



$("#form-three").submit( function(e) {
	var postform = true;
	var formThreeFields = $("#form-three").find("*[required]");

	formThreeFields.removeClass("error");
	$("#terms").removeClass("error");

	formThreeFields.each(function() {
		var type = $(this).attr("type");
		var val = $(this).val();

		if (type == "email") {
			if (!validateEmail(val)) {
				postform = false;
				$(this).addClass("error");
			}
		} else if (type == "password") {
			if (val === undefined || val == null || val == "") {
				postform = false;
				$(this).addClass("error");
			}
		} else if (type == "checkbox") {
			if (!$('#termsCheck').is(':checked')) {
				postform = false;
				$("#terms").addClass("error");
			}
		}
	});
	if (!postform) {
		e.preventDefault();
	}
});


//PASSWORD - REPEAT...









});

function validateEmail(email) {
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(String(email).toLowerCase());
}





//Features man kan ta med om man orkar/vill som höjer kvalitén!
//		+Hämta inloggade avnändarens förnamn och displaya det som "Welcome: + $username"; (AJAX)
