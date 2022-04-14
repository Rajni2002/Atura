const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/BudgetDB");
const app = express();

app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// Schema and model for Monthly Budget
const BudgetSchema = new mongoose.Schema({
  income: Number,
  year: Number,
  month: Number,//1 based indexing
  expenses: [{ category: String, amount: String, colorCode: String }],
});

const Budgets = mongoose.model("Budget", BudgetSchema);
  

app.get("/", function (req, res) {
  res.render("monthlyBudget");
});

app.post("/jsondata", function (req, res) {
    console.log(req.body);
    const currBudget = new Budgets({
      income: Number(req.body.income),
      year: req.body.year,
      month: req.body.month,
      expenses: req.body.expenseList
    });
    currBudget.save();
});

app.listen(3000, function () {
  console.log("Server is up and running");
});
