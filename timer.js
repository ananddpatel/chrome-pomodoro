function init() {
	startTimer();
}

function startTimer() {
	var time = moment()
	setInterval(function() {
		var diff = moment().diff(time, 'seconds');
		console.log(diff);
		document.getElementById('time').innerText = diff;
	}, 1000)
}

document.addEventListener('DOMContentLoaded', init)