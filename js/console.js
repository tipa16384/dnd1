function showTitle() {
	clrscr();
	pri("     DUNGEONS AND DRAGONS #1");
	pri();
}

function getCommand() {
	return $('[name=console]').val().toUpperCase();
}

function scrl() {
	while ($('.paper > div').length >= 30) {
		$('.paper > div:first-child').remove();
	}
}

function clrscr() {
	for (var i = 0; i < 30; ++i) {
		pri();
	}
}

function pri(s) {
	scrl();
	if (!s) {
		s = "";
	}
	$('.paper').append('<div>' + s.toUpperCase() + '</div>');
}

function inp(s, responses) {
	$('.console > div:first-child').html(s.toUpperCase() + '? ');
	$('#typeHere').val('');
	if (typeof responses == "undefined") {
		responses = new Array();
	}
	// still not decided if we can get away with autocomplete.
	// well, it's here if we need it.
	//$('#typeHere').autocomplete({ source: responses });
	$('#typeHere').prop("choices", responses);
	$('#typeHere').focus();
}

