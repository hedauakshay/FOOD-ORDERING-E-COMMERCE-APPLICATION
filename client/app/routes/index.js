$("[name='cardNumber']").change(function(){
	var input = $("[name='cardNumber']");
	if(input.val().substring(0, 1) == 4) {
		$('#cardlogo').addClass('fa-cc-visa');
	}
	if(input.val().substring(0, 2) == 34 || input.val().substring(0, 2) == 37) {
		$('#cardlogo').addClass('fa-cc-amex');
	}
	if(input.val().substring(0, 2) == 51 || input.val().substring(0, 2) == 52 || input.val().substring(0, 2) == 53 || input.val().substring(0, 2) == 54 || input.val().substring(0, 2) == 55) {
		$('#cardlogo').addClass('fa-cc-mastercard');
	}
	if(input.val().substring(0, 4) == 6011 || input.val().substring(0, 2) == 65) {
		$('#cardlogo').addClass('fa-cc-discover');
	}
	else if(input.val().length === 0) {
		$('#cardlogo').removeClass('fa-cc-visa fa-cc-amex fa-cc-mastercard fa-cc-discover');
	};
});