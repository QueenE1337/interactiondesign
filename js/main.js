var transEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";


$(document).ready(function() {

	$(document).ready(function() {
	  $(":checkbox").click(function(event) {
	    if ($(this).is(":checked")) {
	      $(".addEmail").addClass("show");
				$(".addEmail input").removeAttr("tabindex");
	    } else
	      $(".addEmail").removeClass("show");
	  });

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
});
