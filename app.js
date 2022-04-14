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
  month: Number, //1 based indexing
  expenses: [{ category: String, amount: String, colorCode: String }],
});

const Budgets = mongoose.model("Budget", BudgetSchema);

app.get("/budget", function (req, res) {
  let currdate = new Date();
  Budgets.find(
    { year: currdate.getFullYear(), month: currdate.getMonth() },
    function (err, result) {
      if (err) console.log(err);
      else {
        if(result.length == 0){
          res.render("enter");
        }else{
          // res.send("Rendered current month Budget", result);
          res.render("currBudget", {
            expenseList: result[0].expenses
          });
        }
      }
    }
  );
});

app.get("/fillBudget", function(req,res){
  res.render("editMonthlyBudget");
})

app.post("/jsondata", function (req, res) {
  let currdate = new Date();
  console.log(req.body);
  Budgets.deleteOne({year: currdate.getFullYear(), month: currdate.getMonth()}).then(function(){
    console.log("Deleted");
  }).catch(function(err){
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

app.listen(3000, function () {
  console.log("Server is up and running");
});
