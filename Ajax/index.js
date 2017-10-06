"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.onload = function () {
    var ciity = "skive";
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + ciity;
    url += '&' + $.param({
        'appid': "902f5a1315ae09b40fe14a00ef66e60a"
    });
    $.ajax({
        url: url,
        dataType: "json",
        method: 'GET',
        success: function (a) {
            console.log(a);
        }
    });
};
