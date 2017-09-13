

function calc() {
  let amountElem = <HTMLInputElement>document.getElementById("amount");
  let percentElem = <HTMLInputElement>document.getElementById("percent");

  let amount = +amountElem.value;
  let percent = +percentElem.value;
  let tip = amount * percent / 100;
  tip = Math.round(tip * 100) / 100;
  let total = tip + amount;
  total = Math.round(total * 100) / 100;
  
  document.getElementById("tip").innerText = "" + tip;
  document.getElementById("total").innerText = "" + total;
}

