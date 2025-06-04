const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  firstname: { type: String, reqired: true },
  lastname: { type: String, reqired: true },
});

module.exports = mongoose.model("Employee", employeeSchema); //  will look for employees
