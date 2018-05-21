$(function() {
	$('#sendButton').click(function() {
		var val = $('#inputContain').val();
		send(val)
	})

	$('#mind li').click(function() {
		send($(this).text());
	});
})

$('#inputContain').on('keyup',
function(e) {
	if (e.keyCode == 13) {
		send($(this).val())
	}
});

function send(val) {
	if ($.trim(val)) {
		$('#ripple').fadeIn();
		var date = new Date_();
		var html = [
			'<div class="user">',
				'<div class="time">' + date.time + '</div>',
				'<span class="span"></span>',
			'</div>'
		].join('');
		$('#container').append(html);
		$('.span:last').text(val);
		/*防止脚本注入*/
		clearInput();
		window.location.href = "#blank";

		setTimeout(function() {
			cellback(val)
		},
		500)
	} else {
		alert('你都没打字！');
	}
}

/*get time*/
var Date_ = function() {
	var date = new Date();
	this.year = date.getFullYear();
	this.month = date.getMonth() + 1;
	this.day = date.getDate();
	this.hours = date.getHours();
	this.minutes = date.getMinutes();
	this.seconds = date.getSeconds();
	this.time = this.year + "-" + this.month + '-' + this.day + " " + this.hours + ':' + this.minutes + ':' + this.seconds;
}

function cellback(val) {
	$.ajax({
		 url: "http://route.showapi.com/60-27?showapi_sign=860ce87a42ea467d872e88fcdae517f1&info=" + val + "&userid=anxiaosi&showapi_appid=37935&",
        type: "POST",
        dataType: 'jsonp',
        data: {
            "showapi_sign_method": 'md5',
            "showapi_res_gzip": 0,
            // "showapi_timestamp":new Date(),
        },
        jsonp: 'jsonpcallback',
        success: function(data) {
            generate(data.showapi_res_body.text);
            console.log(data.showapi_res_body.text)
        }
	})

}

function generate(val) {
	var date = new Date_();
	var html = [
		'<div class="service">',
			'<div class="time">' + date.time + '</div>',
			'<span class="span"></span>',
		'</div>'
	].join('');
	$('#container').append(html);
	$('.span:last').text(val);
	window.location.href = "#blank";
	$('#ripple').fadeOut();
}

var setTime;
function clearInput() {
	$('#mind li').hide();
	$('#mind').hide();
	$('#inputContain').val('');
}