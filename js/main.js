var transEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";


$(document).ready(function() {

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


	// but NOT on clicks in the modal (=prevent "bubbling")
	$("#modal").on("click", function(e) {
		e.stopPropagation();
	});

	$("#register").on("click", function(e) {
		e.stopPropagation();
	});


	//REGISTRATION Next & Back buttons
	//FROM STEP ONE --> TWO
	$("#to-step2").on("click", function(e) {
		e.preventDefault();

		$("#register").removeClass("back-step1");
		$("#register").addClass("step2");

		$("#profession, #secondstep a").removeAttr("tabindex");
	})

	//FROM STEP TWO --> THREE
	$("#to-step3").on("click", function(e) {
		e.preventDefault();

		$("#register").addClass("step3");

		$("#register").removeClass("step2");
		$("#register").removeClass("back-step2");

		$("#thirdstep input, #thirdstep a").removeAttr("tabindex");
	})

	//BACK STEP TWO --> ONE
	$("#back-to-step1").on("click", function(e) {
		e.preventDefault();

		$("#register").addClass("back-step1");

		$("#register").removeClass("step2");
		$("#register").removeClass("back-step2");
		$("#register").removeClass("step3");
	})

	//BACK STEP THREE --> TWO
	$("#back-to-step2").on("click", function(e) {
		e.preventDefault();

		$("#register").addClass("back-step2");
		$("#register").removeClass("step3");
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

function validateEmail(email) {
var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
return re.test(String(email).toLowerCase());
}

});



//Features man kan ta med om man orkar/vill som höjer kvalitén!
//		+Hämta inloggade avnändarens förnamn och displaya det som "Welcome: + $username"; (AJAX)
