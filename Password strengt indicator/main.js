"use strict";
function calc() {
    var passwordElm = document.getElementById("password");
    var password = passwordElm.value;
    var spanElm = document.getElementById("strenght");
    var passwordnumber = +passwordElm.value;
    if (spanElm != null) {
        StrenghtChecker(passwordnumber, password, spanElm);
    }
}
function ContainsNumber(password) {
    for (var i = 0; i < password.length; i++) {
        if ("0" <= password.charAt(i) && password.charAt(i) <= "9") {
            return true;
        }
    }
    return false;
}
function ContainsSpecialChar(password) {
    for (var i = 0; i < password.length; i++) {
        if (!("0" <= password.charAt(i) && password.charAt(i) <= "9" || "a" <= password.charAt(i) && password.charAt(i) <= "z") || "A" <= password.charAt(i) && password.charAt(i) <= "Z") {
            return true;
        }
    }
    return false;
}
function StrenghtChecker(passwordnumber, password, spanElm) {
    if (HasNumbersLetterSpecialchars(passwordnumber, password)) {
        ShowStrenght(password, "very strong", spanElm);
    }
    else if (HasLettersNumbers(passwordnumber, password)) {
        ShowStrenght(password, "strong", spanElm);
    }
    else if (HasOnlyNumbers(passwordnumber, password)) {
        ShowStrenght(password, "very weak", spanElm);
    }
    else if (HasOnlyLetters(passwordnumber, password)) {
        ShowStrenght(password, "weak", spanElm);
    }
}
function HasNumbersLetterSpecialchars(passwordnumber, password) {
    return (isNaN(passwordnumber) && (ContainsNumber(password)) && (ContainsSpecialChar(password)) && password.length >= 8); //IsNanN betyder det er en streng, da et number ville give !IsNaN
}
function HasLettersNumbers(passwordnumber, password) {
    return (isNaN(passwordnumber) && (ContainsNumber(password)) && password.length >= 8);
}
function HasOnlyNumbers(passwordnumber, password) {
    return (!(isNaN(passwordnumber)) && password.length < 8);
}
function HasOnlyLetters(passwordnumber, password) {
    return (isNaN(passwordnumber) && password.length < 8);
}
function ShowStrenght(password, text, spanElm) {
    spanElm.innerText = "The password " + password + " is a " + text + " password";
}
