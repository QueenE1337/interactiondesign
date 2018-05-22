var transEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";


$(document).ready(function() {

	  $(":checkbox").click(function(event) {
	    if ($(this).is(":checked")) {
	      $(".addEmail").addClass("show");
				$(".addEmail input").removeAttr("tabindex");
	    } else
	      $(".addEmail").removeClass("show");
	  });




	// Open the modal by adding class to <body> and use CSS- to change things when body has that class
	$("a.open-modal").on("click", function(e) {
		e.preventDefault();

		$("body").addClass("modal-showing");

		//Add a FOCUS on input field.
		$(this).find("input, a").eq(0).trigger("focus");
	});

	// CLOSE modal by removing the class from <body>
	// 1. click on the cancel-button
	// 2. click on the modal container
	$(".modal-container, #modal .cancel").on("click", function(e) {
		e.preventDefault();

		$("body").addClass("closing");


		$(".modal-container #modal").one(transEnd, function() {

			$("body").removeClass("modal-showing closing");
			$(this).off(transEnd);
		});
	})

	// but NOT on clicks in the modal (=prevent "bubbling")
	$("#modal").on("click", function(e) {
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
