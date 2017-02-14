var states = {
	"pomodoro": "something"
}

var pomodoroState = false;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.command === 'startTimer' && !pomodoroState) {
			startTimer();
			sendResponse({"message": "Timer started"});
		}
	})

function startTimer() {
	var time = moment();
	var timer = setInterval(function() {
		var diff = moment().diff(time, 'seconds');
		pomodoroState = true;
		updateTime(diff);
		if (diff > 10) {
			clearInterval(timer);
			notifyUser();
		}
	}, 1000)
}

function updateTime(timeDifference) {
	chrome.runtime.sendMessage({
		command: "updateTime",
		time: timeDifference
	});
}

function notifyUser() {
	var opts = {
		"type": "basic",
		"title": "Break Time!",
		"message": "Time for a break!",
		"iconUrl": "icon.png"
	};
	var id = "pomodoro" + (new Date().getTime());
	chrome.notifications.create(id, opts);
};