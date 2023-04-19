
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.studentBoard = (req, res) => {
  res.status(200).send("student Content.");
};

exports.teacherBoard = (req, res) => {
  res.status(200).send("teacher Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.evaluatorBoard = (req, res) => {
  res.status(200).send("Evaluator Content.");
};