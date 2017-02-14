function init() {
	addMessageListeners();
	startTimer();
}

function startTimer() {
	// sends message to background.js
	chrome.runtime.sendMessage({"command": "startTimer"},
		function(response) {
			// response callback
			console.log(response.message);
		})
}

function updateTime(timeDifference) {
	pomTimer = document.getElementById('time').innerText = timeDifference;
	// console.log(pomTimer);
}

function addMessageListeners() {
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			if (request.command === 'updateTime') {
				updateTime(request.time);
			}
		});
}


// var pomTimer = document.getElementById('time').innerText;
document.addEventListener('DOMContentLoaded', init);