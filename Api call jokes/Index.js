"use strict";
$('#search').click(function () {
    CallApi();
});
function CallApi() {
    $.ajax({
        "url": "https://api.chucknorris.io/jokes/random",
        success: function (response) {
            console.log(response);
        }
    });
}
