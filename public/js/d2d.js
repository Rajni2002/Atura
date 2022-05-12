let today = new Date();
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const newExpenseModal = document.getElementById("newExpenseModal");
const modalBackDrop = document.getElementById("modalBackDrop");

let amount = document.getElementById("amount");
let note = document.getElementById("note");
let category = document.getElementById("category");

let monthAndYear = document.getElementById("monthAndYear");
let currentYear = today.getFullYear();
let currentMonth = today.getMonth();

buildCalender(currentMonth, currentYear);

function next() {
  currentYear = currentMonth == 11 ? currentYear + 1 : currentYear;
  currentMonth = (currentMonth + 1) % 12;
  buildCalender(currentMonth, currentYear);
}
function previous() {
  currentYear = currentMonth == 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth == 0 ? 11 : currentMonth - 1;
  buildCalender(currentMonth, currentYear);
}

function buildCalender(month, year) {
  let firstDay = new Date(year, month).getDay();

  let tbl = document.getElementById("calender-body");
  tbl.innerHTML = "";

  monthAndYear.innerHTML = months[month] + " " + year;

  let arrExpenses = [];

  let xhr = new XMLHttpRequest();
  xhr.onload = async function () {
    const xhrObject = await xhr;
    if (xhrObject.status >= 200 && xhrObject.status < 300) {
      arrExpenses = await JSON.parse(xhrObject.responseText);
      console.log(arrExpenses);
    } else {
      console.log(JSON.parse(xhrObject.responseText));
    }
  };
  xhr.open("GET", "dailyExpense");
  xhr.send();

  setTimeout(() => {
    let date = 1;
    for (let i = 0; i < 6; ++i) {
      let row = document.createElement("tr");
      for (let j = 0; j < 7; ++j) {
        if (i == 0 && j < firstDay) {
          let cell = document.createElement("td");
          let cellDiv = document.createElement("div");
          let cellP = document.createElement("p");
          cellP.innerText = "";
          cellDiv.appendChild(cellP);
          cell.appendChild(cellDiv);
          row.appendChild(cell);
        } else if (date > daysInMonth(month, year)) {
          break;
        } else {
          let cell = document.createElement("td");
          let cellDiv = document.createElement("div");
          if (date == today.getDate() && month == today.getMonth()) {
            // cellDiv.style.backgroundColor = "rgb(255, 255, 255)";
            cellDiv.classList += "selected";
          }
          let cellP = document.createElement("p");
          cellP.innerText = date;
          cellDiv.appendChild(cellP);
          arrExpenses.forEach(function (element) {
            if (
              element.date == date &&
              element.month == month &&
              element.year == year
            ) {
              let elementExpenses = element.expenses;
              let sum = 0;
              elementExpenses.forEach(function (e) {
                sum += e.amount;
              });
              let sumP = document.createElement("p");
              sumP.innerText = String(sum);
              cellDiv.appendChild(sumP);
            }
          });

          cell.appendChild(cellDiv);
          row.appendChild(cell);
          date++;
        }
      }
      tbl.appendChild(row);
    }
    AfterBuildCalender(month, year);
  }, 1000);
}

function daysInMonth(iMonth, iYear) {
  return 32 - new Date(iYear, iMonth, 32).getDate();
}

function openModal(date, month, year) {
  // Load the categories
  fetch("/fetchCategories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      month: month,
      year: year,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      let arrExpenses = data.expenses;
      if (arrExpenses) {
        arrExpenses.forEach(function (element) {
          let option = document.createElement("option");
          option.value = element.category;
          option.innerText = element.category;
          category.appendChild(option);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // To fetch previous Expenses
  const data = {
    year: year,
    month: month,
    date: date,
  };
  fetch("/fetchExpenses", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      if (data) {
        data.forEach(function (element) {
          let thExpense = document.createElement("tr");

          let categoryTh = document.createElement("th");
          let amountTh = document.createElement("th");
          let noteTh = document.createElement("th");

          categoryTh.innerText = element.category;
          amountTh.innerText = element.amount;
          noteTh.innerText = element.note;

          thExpense.appendChild(categoryTh);
          thExpense.appendChild(amountTh);
          thExpense.appendChild(noteTh);

          let modalTable = document.querySelector("#newExpenseModal tbody");
          modalTable.appendChild(thExpense);
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  newExpenseModal.style.display = "block";
  modalBackDrop.style.display = "block";

  document.getElementById("saveButton").addEventListener("click", function () {
    fetch("/dailyExpense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        year: year,
        month: month,
        date: date,
        amount: Number(amount.value),
        note: note.value,
        category: category.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let thExpense = document.createElement("tr");

        let categoryTh = document.createElement("th");
        let amountTh = document.createElement("th");
        let noteTh = document.createElement("th");

        categoryTh.innerText = category.value;
        amountTh.innerText = Number(amount.value);
        noteTh.innerText = note.value;

        thExpense.appendChild(categoryTh);
        thExpense.appendChild(amountTh);
        thExpense.appendChild(noteTh);

        let modalTable = document.querySelector("#newExpenseModal tbody");
        modalTable.appendChild(thExpense);
        document.getElementById("amount").value = "";
        document.getElementById("note").value = "";
      });
  });

  document
    .getElementById("cancelButton")
    .addEventListener("click", function () {
      document.querySelector("#newExpenseModal tbody").innerHTML = "";
      document.getElementById("calender-body").innerHTML = "";
      newExpenseModal.style.display = "none";
      modalBackDrop.style.display = "none";
      amount.value = "";
      note.value = "";
      category.innerHTML = "";
      buildCalender(currentMonth, currentYear);
    });
}

function AfterBuildCalender(month, year) {
  let calenderCollections = document.querySelectorAll(
    "#calender-body tr td div"
  );
  calenderCollections.forEach(function (cell) {
    cell.addEventListener("click", function () {
      if (cell.childNodes[0].innerText != ""){
        openModal(Number(cell.childNodes[0].innerText), month, year);
      }
    });
  });
}
