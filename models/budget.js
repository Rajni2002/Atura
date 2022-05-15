const mongoose = require("mongoose");
const BudgetSchema = new mongoose.Schema({
  income: Number,
  year: Number,
  month: Number,
  expenses: [{ category: String, amount: Number}]
});
module.exports = mongoose.model("Budget", BudgetSchema);
