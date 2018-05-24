var transEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";


$(document).ready(function() {

	$("a#loginmenulink").on("click", function(e) {
		e.preventDefault();

		$("body").addClass("modal-showing");
	});

	// Open the login modal
	$("a.open-modal").on("click", function(e) {
		e.preventDefault();

		$("body").addClass("modal-showing");
	});

	// Open register pop-up on click
	$("a.openRegister").on("click", function(e) {
		e.preventDefault();

		$("body").addClass("register-showing");
		$("body").removeClass("modal-showing");
	});


	// CLOSE LOGIN MODAL ON CANCEL ( X )
	$(".modal-container, #modal .cancel").on("click", function(e) {
		e.preventDefault();

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


});
