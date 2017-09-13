"use strict";
function calc() {
    var amountElem = document.getElementById("amount");
    var percentElem = document.getElementById("percent");
    var amount = +amountElem.value;
    var percent = +percentElem.value;
    var tip = amount * percent / 100;
    tip = Math.round(tip * 100) / 100;
    var total = tip + amount;
    total = Math.round(total * 100) / 100;
    document.getElementById("tip").innerText = "" + tip;
    document.getElementById("total").innerText = "" + total;
}
