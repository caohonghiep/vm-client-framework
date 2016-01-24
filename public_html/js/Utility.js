window.Utility = window.Utility || {};
Utility.waitingAvailableCallback = function (available, callback) {
    var timer = setInterval(function () {
        var av = available;
        if (typeof available === 'function') {
            av = available.apply();
        }
        if (av) {
            clearInterval(timer);
            callback.apply();
        }
    }, 250);
};
