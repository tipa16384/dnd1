String.prototype.pad = function(n) {
	var s = this;
	while (s.length < n) {
		s = s + " ";
	}
	
	return s;
}

String.prototype.setCharAt = function(pos,chr) {
	if (pos >= 0 && pos < this.length) {
		return this.substring(0,pos)+chr+this.substring(pos+1);
	} else {
		return this;
	}
}

function randint(n) {
	return Math.floor(Math.random()*n+1);
}

var game = new Game();

$(function(){
	$('#typeHere').on('keyup',function(e){
		//console.log('keyup '+e.which);
		if (e.which == 13) {
			var e2 = jQuery.Event( "change" );
			$('#typeHere').trigger(e2);
		} else {
			var choices = $('#typeHere').prop("choices");
			if (choices && choices.length > 0 && $('#typeHere').val().length == 1) {
				var firstChar = $('#typeHere').val().toUpperCase();
				for (var i=0; i<choices.length; ++i) {
					if (choices[i].substr(0,1) == firstChar) {
						var e2 = jQuery.Event( "change" );
						$('#typeHere').val(choices[i]);
						$('#typeHere').trigger(e2);
						break;
					}
				}
			}
		}
	});

	$('#typeHere').on('change',function(){
		//console.log("change event");
		if ($('#typeHere').val()) {
			pri($('.console > div:first-child').text()+$('#typeHere').val());
			game.process();
		}
	});

	showTitle();
	game.process();
});

