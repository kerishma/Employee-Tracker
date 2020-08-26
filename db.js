const mysql = require("mysql");

// Conect to employee_db database
const connection = mysql.createConnection({
  host: "localhost",
  //Port number
  port: 3306,
  // user name
  user: "root",
  // password you set
  password: "we4allah",
  database: "employee_db",
  // multipleStatements: true,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;

