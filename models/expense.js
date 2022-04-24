const mongoose = require("mongoose");
const ExpenseSchema = new mongoose.Schema({
  year: Number,
  month: Number,
  date: Number,
  expenses: [{ 
      category: String,
      amount: Number,
      note: String
    }]
});
module.exports = mongoose.model("Expense", ExpenseSchema);