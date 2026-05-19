/* function validate() will validate form data using jQuery */
function validate() {
	// Get form values using jQuery
	var sid = $("#sid").val();
	var pwd1 = $("#pwd1").val();
	var pwd2 = $("#pwd2").val();
	var uname = $("#uname").val();
	var genm = $("#genm").prop("checked");
	var genf = $("#genf").prop("checked");

	var errMsg = "";								/* create variable to store the error message */
	var result = true;								/* assumes no errors */
	var pattern = /^[a-zA-Z ]+$/;					/* regular expression for letters and spaces only */

	/* Rule 1, check if all required data are entered */
	if (sid == "") {								//check whether User ID is empty
		errMsg += "<li>User ID cannot be empty.</li>";
	}
	if (pwd1 == "") {								//check whether Password is empty
		errMsg += "<li>Password cannot be empty.</li>";
	}
	if (pwd2 == "") {								//check whether re-typed Password is empty
		errMsg += "<li>Retype password cannot be empty.</li>";
	}
	if (uname == "") {								//check whether User Name is empty
		errMsg += "<li>User name cannot be empty.</li>";
	}
	if ((!genm) && (!genf)) {						//check whether gender is selected
		errMsg += "<li>A gender must be selected.</li>";
	}
	
	/* Rule 2, check if the user ID contains an @ symbol */
	if (sid.indexOf('@') == 0) {
		errMsg += "<li>User ID cannot start with an @ symbol.</li>";
	}
	if (sid.indexOf('@') < 0) {
		errMsg += "<li>User ID must contain an @ symbol.</li>";
	}
	
	/* Rule 3, check if password and retype password are the same */
	if (pwd1 != pwd2) {
		errMsg += "<li>Passwords do not match.</li>";
	}
	
	/* Rule 4, check if user name contains only letters and spaces */
	if (!uname.match(pattern)) {
		errMsg += "<li>User name contains symbols.</li>";
	}

	/* Display error message if any error(s) is/are detected */
	if (errMsg != "") {
		// Build the error popup window
		errMsg = "<div id='scrnOverlay'></div>" +
			"<section id='errWin' class='window'>" +
			"<ul>" + errMsg + "</ul>" +
			"<a href='#' id='errBtn' class='button'>Close</a>" +
			"</section>";
		
		// Count number of error items
		var numOfItems = (errMsg.match(/<li>/g) || []).length;
		
		// Add error window to the page
		$("body").append(errMsg);
		
		// Show overlay and error window
		$("#scrnOverlay").css('visibility', 'visible');
		$("#errWin").css('height', (numOfItems * 1.5 + 5).toString() + 'em');
		$("#errWin").css('margin-top', '-' + (numOfItems * 0.75 + 2.5).toString() + 'em');
		$("#errWin").show();
		
		// Close button functionality
		$("#errBtn").click(function() {
			$("#scrnOverlay").remove();
			$("#errWin").remove();
		});
		
		result = false;
	} 
	return result;
}

/* write the function toggle() that collapses/expands a section */
function toggle() {
	$(this).parent().next().slideToggle();  /* collapse/expand the fieldset */
	
	/* Update the symbol on the button */
	if ($(this).html() == "[-]") {
		$(this).html("[+]");
	} else {
		$(this).html("[-]");
	}
}

/* link HTML elements to corresponding event function */
function init() {
	$(".collapse").click(toggle);           /* link function toggle() to collapse buttons */
	$("#regform").submit(validate);         /* link function validate() to submit event */
}

/* execute function init() once the document is ready */
$(document).ready(init);