const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema({
  year: Number,
  month: Number,
  expenses: [{ 
      category: String,
      amount: Number,
      date: Number
    }]
});
module.exports = mongoose.model("Expense", ExpenseSchema);