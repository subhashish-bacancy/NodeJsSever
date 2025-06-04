const Employee = require("./../model/Employee");

const getAllEmployees = async (req, res) => {
  // res.json(data.employees);
  const employees = await Employee.find();
  if (!employees) return res.status(204).json({ message: "No employees" });
  res.json(employees);
};

const createNewEmployee = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname) {
    return res.status(400).json({ message: "Bad  request" });
  }
  try {
    const result = await Employee.create({
      firstname: req?.body?.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json(res);
  } catch (error) {
    console.error(error);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Bad  request" });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No matching id ${req.body.id} found` });
  }
  if (req.body.firstname) employee.firstname = req.body.firstname;
  if (req.body.lastname) employee.lastname = req.body.lastname;
  const result = await employee.save();
  res.json(result);
};

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "Bad  request" });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No matching id ${req.body.id} found` });
  }
  const result = await Employee.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getEmployee = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "Bad  request" });
  }
  const employee = await Employee.findOne({ _id: req.params.id }).exec();
  if (!employee) {
    return res
      .status(204)
      .json({ message: `No matching id ${req.params.id} found` });
  }
  res.json(employee);
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
};
