const monthArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const navbar = document.getElementById('navbar')


let currentDate = new Date();
let currMonth = currentDate.getMonth();
document.querySelector(".currMonth").innerText = monthArray[currMonth]+" "+currentDate.getFullYear();


function trigger() {
  let del = document.querySelectorAll(".delete");
  for (let i = 0; i < del.length; i++) {
    del[i].addEventListener("click", function () {
      let parent = this.parentElement;
      parent.remove();
    });
  }
}

function newElement() {
  // Fetching the values
  let Category = document.getElementById("category").value;
  let Amount = document.getElementById("amount").value;
  let colorSelect = document.getElementById("color-select").value;
  // creating the list item and appending it

  if (Category === "" || Amount === "") {
    alert("You must write something!");
  } else {
    let expenseDiv = document.createElement("div");
    expenseDiv.classList += "expense";

    let divCat = document.createElement("div");
    let divAmt = document.createElement("div");
    let divCol = document.createElement("div");
    let divDel = document.createElement("div");

    divCat.classList += "category";
    divAmt.classList += "amount";
    divCol.classList += "color-select";
    divDel.classList += "delete";

    let pCat = document.createElement("p");
    let pAmt = document.createElement("p");
    let pDel = document.createElement("p");

    pCat.innerText = Category;
    divCat.appendChild(pCat);
    pAmt.innerText = Amount;
    divAmt.appendChild(pAmt);
    pDel.innerText = "X";
    divDel.appendChild(pDel);

    let divColTag = document.createElement("div");
    divColTag.style.width = "20px";
    divColTag.style.height = "20px";
    divColTag.style.backgroundColor = colorSelect;
    divColTag.style.borderRadius = "50%";
    divColTag.style.position = "relative";
    divColTag.style.top = "14px";
    divCol.appendChild(divColTag);

    expenseDiv.appendChild(divCat);
    expenseDiv.appendChild(divAmt);
    expenseDiv.appendChild(divCol);
    expenseDiv.appendChild(divDel);

    document.querySelector(".expenses").appendChild(expenseDiv);
  }
  // Resetting the input values
  document.getElementById("category").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("color-select").value = "#000000";
  trigger();
}
function sendData() {
  console.log("clicked");
  let expenseList = [];
  let income = document.getElementById("income").value;
  let category = document.querySelectorAll(".category p");
  let amount = document.querySelectorAll(".amount p");
  let colorCode = document.querySelectorAll(".color-select div");
  for (let i = 0; i < category.length; i++) {
    let object = {
      category: category[i].innerText,
      amount: Number(amount[i].innerText),
      colorCode: colorCode[i].style.backgroundColor,
    };
    console.log(object);
    expenseList.push(object);
  }
  fetch("/jsondata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      year: currentDate.getFullYear(),
      month: currMonth,
      expenseList: expenseList,
      income: income,
    }),
  });
  setTimeout(()=>{
    window.location.replace("/budget");
  }, 1000)

}
