const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/BudgetDB");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Importing models
const Budgets = require("./models/budget");
const Expenses = require("./models/expense");

app.get("/budget", function (req, res) {
  let currdate = new Date();
  Budgets.find(
    { year: currdate.getFullYear(), month: currdate.getMonth() },
    function (err, result) {
      if (err) console.log(err);
      else {
        if (result.length == 0) {
          res.render("enter");
        } else {
          res.render("currBudget", {
            expenseList: result[0].expenses,
          });
        }
      }
    }
  );
});

app.get("/fillBudget", function (req, res) {
  res.render("editMonthlyBudget");
});

app.get("/dailyTrack", function (req, res) {
  res.render("day2day");
});

app
  .route("/dailyExpense")
  .get(function (req, res) {
    Expenses.find(function(err, result){
      if(err) console.log(err);
      else{
        res.send(result);
      }
    })
  })
  .post(function (req, res) {
    Expenses.findOne(
      {
        year: req.body.year,
        month: req.body.month,
        date: req.body.date,
      },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          if (result) {
            let resultExpense = result.expenses;
            let newExpense = {
              category: req.body.category,
              amount: req.body.amount,
              note: req.body.note,
            };
            resultExpense.push(newExpense);
            Expenses.updateOne(
              {
                year: req.body.year,
                month: req.body.month,
                date: req.body.date,
              },
              { expenses: resultExpense },
              function (err, docs) {
                if (err) {
                  console.log(err);
                } else {
                  console.log("Updated Docs : ", docs);
                  res.send({
                    status: "check"
                  });
                }
              }
            );
          } else {
            let newExpense = new Expenses({
              year: req.body.year,
              month: req.body.month,
              date: req.body.date,
              expenses: [
                {
                  category: req.body.category,
                  amount: req.body.amount,
                  note: req.body.note,
                },
              ]
            });
            newExpense.save();
            res.send({
              status: "check"
            });
          }
        }
      }
    );
  });

app.post("/fetchExpenses", (req, res) => {
  console.log(req.body, "In fetch expenses");
  Expenses.findOne(
    {
      year: req.body.year,
      month: req.body.month,
      date: req.body.date
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        if(result){
          res.send(result.expenses);
        }
      }
    }
  );
});

app.post("/fetchCategories", (req, res) => {
  Budgets.find({ month: req.body.month, year: req.body.year }, function (
    err,
    result
  ) {
    if (!err) {
      res.send(result[0]);
    } else {
      console.log(err);
    }
  });
});

app.post("/jsondata", function (req, res) {
  let currdate = new Date();
  Budgets.deleteOne({
    year: currdate.getFullYear(),
    month: currdate.getMonth(),
  })
    .then(function () {
      console.log("Deleted");
    })
    .catch(function (err) {
      console.log("error", err);
    });
  const currBudget = new Budgets({
    income: Number(req.body.income),
    year: req.body.year,
    month: req.body.month,
    expenses: req.body.expenseList,
  });
  currBudget.save();
  res.redirect("/budget");
});

app.get("/analytics", function(req, res){
  res.render("analytics");
})

app.listen(3000, function () {
  console.log("Server is up and running");
});
