// CHANGE THEME CHECKBOX /////////////////////////////

const checkbox = document.querySelector("input");
const body = document.querySelector("body");
const checkmark = document.querySelector(".checkmark");
const bodyCalc = document.querySelector(".bodyCalc");
const showBox = document.querySelector(".show");
const button = document.querySelectorAll(".btn");
const reset = document.querySelector(".reset");
const del = document.querySelector(".del");
const equality = document.querySelector(".equality");

let checkboxStatus = 1;
checkbox.onchange = () => {
  checkboxStatus === 3 ? (checkboxStatus = 1) : (checkboxStatus += 1);
  console.log(checkboxStatus);
  console.log(button);
  // const checkmark = document.querySelector(".checkmark");
  if (checkboxStatus === 1) {
    checkmark.classList.remove("checkmark3");
    body.classList.remove("body3");
    checkmark.style.background = "hsl(223, 31%, 20%)";
    bodyCalc.classList.remove("bodyCalc3");
    showBox.classList.remove("show3");
    reset.classList.remove("resetAndDel3");
    del.classList.remove("resetAndDel3");
    equality.classList.remove("equality3");

    for (let elem of button) {
      elem.classList.remove("button3");
    }
  }
  if (checkboxStatus === 2) {
    checkmark.classList.add("checkmark2");
    body.classList.add("body2");
    checkmark.style.background = "hsl(0, 5%, 81%)";
    bodyCalc.classList.add("bodyCalc2");
    showBox.classList.add("show2");
    reset.classList.add("resetAndDel2");
    del.classList.add("resetAndDel2");
    equality.classList.add("equality2");

    for (let elem of button) {
      elem.classList.add("button2");
    }
  }
  if (checkboxStatus === 3) {
    checkmark.classList.remove("checkmark2");
    body.classList.remove("body2");
    checkmark.classList.remove("checkboxThemeAndBodyCalc2");
    bodyCalc.classList.remove("bodyCalc2");
    showBox.classList.remove("show2");
    reset.classList.remove("resetAndDel2");
    del.classList.remove("resetAndDel2");
    equality.classList.remove("equality2");

    for (let elem of button) {
      elem.classList.remove("button2");
    }

    checkmark.classList.add("checkmark3");
    body.classList.add("body3");
    checkmark.style.background = "hsl(268, 71%, 12%)";
    bodyCalc.classList.add("bodyCalc3");
    showBox.classList.add("show3");
    reset.classList.add("resetAndDel3");
    del.classList.add("resetAndDel3");
    equality.classList.add("equality3");

    for (let elem of button) {
      elem.classList.add("button3");
    }
  }
};

// CALC /////////////////////////////////////////////////////////////

let a = ""; // first number
let b = ""; // second number
let c = "";
let sign = ""; // current sign
let haveDotА = false; // have a dot for "a"
let haveDotB = false; // have a dot for "b"

const show = document.querySelector(".show");

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
const signs = ["-", "+", "x", "/"];

// function for cleaning
function allClear() {
  a = "";
  b = "";
  c = "";
  sign = "";
  haveDotА = false;
  haveDotB = false;
  show.innerHTML = "0";
  show.style.fontSize = "40px";
}

// function for count
function finishCount() {
  switch (sign) {
    case "+":
      a = +a + +b;
      c = b;
      b = "";
      haveDotB = false;
      break;
    case "-":
      a = +a - +b;
      c = b;
      b = "";
      haveDotB = false;
      break;
    case "x":
      if (b === "") {
        b = 1;
      }
      a = +a * +b;
      c = b;
      b = "";
      haveDotB = false;
      break;
    case "/":
      if (b === "0") {
        a = "Error";
        break;
      }
      if (b === "") {
        b = 1;
      }
      a = +a / +b;
      c = b;
      b = "";
      haveDotB = false;
      console.log(a, sign, b);
      break;
  }
  if ((a + "").length > 12) {
    show.style.fontSize = "25px";
  } else {
    show.style.fontSize = "40px";
  }
  show.innerHTML = a;
}

document.querySelector(".bodyCalc").onclick = (event) => {
  //click on button?
  if (!event.target.classList.contains("btnCalc")) {
    return;
  }

  //click 'reset' button?
  if (event.target.classList.contains("reset")) {
    allClear();
    return;
  }

  //click 'delete'?
  if (event.target.classList.contains("del")) {
    if (a === "Error") {
      return;
    }
    if (a !== "" && b === "") {
      a = a.slice(0, -1);
      if (a.length > 0) {
        show.innerHTML = a;
        if (!a.includes(".")) {
          haveDotА = false;
        }

        return;
      }
      show.innerHTML = 0;
    }
    if (a !== "" && b !== "") {
      b = b.slice(0, -1);
      if (b.length > 0) {
        show.innerHTML = b;
        if (!b.includes(".")) {
          haveDotB = false;
        }
        return;
      }
      show.innerHTML = 0;
    }
    show.innerHTML = 0;
  }

  // is digitals?

  if (digits.includes(event.target.value)) {
    if (a === "Error") {
      return;
    }
    if (sign === "") {
      if (event.target.value === "." && haveDotА === true) {
        return;
      }
      if (event.target.value === ".") {
        haveDotА = true;
      }
      if (a.length < 13) {
        a += event.target.value;
        show.innerHTML = a;
      }

      console.log(a, b, sign);
      return;
    } else if (sign !== "") {
      if (b === "0") {
        b = event.target.value;
        show.innerHTML = b;
        return;
      }
      if (event.target.value === "." && haveDotB === true) {
        return;
      }
      if (event.target.value === ".") {
        haveDotB = true;
      }
      if (b.length < 13) {
        b += event.target.value;
        show.innerHTML = b;
      }

      console.log(a, sign, b, "конец b");
      return;
    }
  }
  // is actions?
  if (signs.includes(event.target.value)) {
    console.log(a);
    if (a === "Error") {
      return;
    }
    if (a === "") {
      a = 0;
    }

    if (sign === event.target.value) {
      finishCount();
      return;
    }
    console.log("sign");
    finishCount();
    sign = event.target.value;
    console.log(a, sign, b);
  }
  // is "="?
  if (event.target.classList.contains("equality")) {
    if (a === "") {
      show.innerHTML = 0;
      return;
    }
    if (b === "") {
      b = c;
      finishCount();
      console.log(a, sign, b);
      return;
    }

    finishCount();

    console.log(a, sign, b, "aaa");
  }
};
