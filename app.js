const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/BudgetDB");
const BudgetSchema = new mongoose.Schema({
  Income: Number,
  Expenses: [{ Category: String, Amount: String }],
});

const Budgets = mongoose.model("Budget", BudgetSchema);
  
app.get("/", function (req, res) {
  res.render("monthlyBudget");
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
