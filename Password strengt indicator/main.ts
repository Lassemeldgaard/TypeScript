function calc() {
    let passwordElm = <HTMLInputElement>document.getElementById("password")
    let password = passwordElm.value;
    let spanElm = document.getElementById("strenght")
    let passwordnumber = +passwordElm.value;
    if (spanElm != null) {
        StrenghtChecker(passwordnumber, password, spanElm);
    }
}
function ContainsNumber(password: string) {
    for (let i = 0; i < password.length; i++) {
        if ("0" <= password.charAt(i) && password.charAt(i) <= "9") {
            return true;
        }
    }
    return false
}
function ContainsSpecialChar(password: string) {
    for (let i = 0; i < password.length; i++) {
        if (!("0" <= password.charAt(i) && password.charAt(i) <= "9" || "a" <= password.charAt(i) && password.charAt(i) <= "z") || "A" <= password.charAt(i) && password.charAt(i) <= "Z") {
            return true;
        }
    }
    return false
}
function StrenghtChecker(passwordnumber: number, password: string, spanElm: HTMLSpanElement) {    
    if (HasNumbersLetterSpecialchars(passwordnumber, password)) {
        ShowStrenght(password, "very strong", spanElm)
    }
    else if (HasLettersNumbers(passwordnumber, password)) {
        ShowStrenght(password, "strong", spanElm)
    }

    else if (HasOnlyNumbers(passwordnumber, password)) {
        ShowStrenght(password, "very weak", spanElm)
    }

    else if (HasOnlyLetters(passwordnumber, password)) {
        ShowStrenght(password, "weak", spanElm)
    }
}
function HasNumbersLetterSpecialchars(passwordnumber: number, password: string) {
    return (isNaN(passwordnumber) && (ContainsNumber(password)) && (ContainsSpecialChar(password)) && password.length >= 8) //IsNanN betyder det er en streng, da et number ville give !IsNaN
}
function HasLettersNumbers(passwordnumber: number, password: string) {
    return (isNaN(passwordnumber) && (ContainsNumber(password)) && password.length >= 8)
}
function HasOnlyNumbers(passwordnumber: number, password: string) {
    return (!(isNaN(passwordnumber)) && password.length < 8)
}
function HasOnlyLetters(passwordnumber: number, password: string) {
    return (isNaN(passwordnumber) && password.length < 8)
}
function ShowStrenght(password: string, text: string, spanElm: HTMLSpanElement) {
    spanElm.innerText = "The password " + password + " is a " + text + " password";
}