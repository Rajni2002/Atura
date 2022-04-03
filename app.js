const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/BudgetDB");
const BudgetSchema = new mongoose.Schema({
  Income: Number,
  Expenses: [{ Category: String, Amount: String }],
});

const Budgets = mongoose.model("Budget", BudgetSchema);

// const B1 = new Budgets(
//   {
//     Income: 90000,
//     Expenses: [
//       {
//         Category: "Food",
//         Amount: "3000"
//       },
//       {
//         Category: "Appereal",
//         Amount: "5000"
//       }
//     ]
//   });

// B1.save();
  
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/jsondata", function (req, res) {
    console.log(Number(req.body.Income), req.body.ExpenseList);
  const newBudget = new Budgets({
      Income: Number(req.body.Income),
      Expenses: req.body.ExpenseList
  })
  newBudget.save();
});

app.listen(3000, function () {
  console.log("Server is up and running");
});
