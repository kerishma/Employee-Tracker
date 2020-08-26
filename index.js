const inquirer = require("inquirer");
const connection = require("./db");


const viewChoices = [
  "view Department",
  "view Employee",
  "view Roles",
  "update Employees",
  "Exit",
];

// const viewEmployees = [
//   "Naaz Maududi",
//   "Fereshta Tarin",
//   "Kerishma Tarin",
//   "Imal Maududi",
//   "Naweed Maududi",
//   "exit",
// ];

// const newEmployee = ["First Name", "Last Name", "Role", "exit"];

runSearch();
function runSearch() {
  inquirer
    .prompt([
      {
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: viewChoices,
      },
    ])
    .then((answer) => {
      // We close the connections so we have to re-establish it
      if (connection.state == "disconnected") {
        connection.connect();
      }
      switch (answer.action) {
        case viewChoices[0]:
          viewDepartment();
          break;

        case viewChoices[1]:
          viewEmployee();
          break;

        case viewChoices[2]:
          viewRole();
          break;

        case viewChoices[3]:
          updateEmployee();
          break;

        case viewChoices[4]:
          //End the connection here
          connection.end();
          break;
      }
      // runSearch();
    });
}

function viewDepartment() {
  const query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function viewEmployee() {
  console.log("getting data")
  // I added the JOIN because its two different tables
  // accessing two different columns, 
  const query =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee INNER JOIN role ON role.id = employee.id";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function viewRole() {
  const query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

const updateEmployee = () => {
  // function runUpdateSearch() {
    connection.query("SELECT * FROM employee", function (errM, resM) {
    connection.query("SELECT * FROM role", function (errRole, resRole) {
    inquirer
      .prompt([
        {
          name: "action",
          type: "list",
          message: "Which Employee would you like to update?",
          choices: resM.map(employee => {
            return{
              name: employee.first_name + " " + employee.last_name,
              value: employee.id
            }
          }),
        },
          {
            name: "newRole", 
            type: "list",
            message: "what role would you like to assign",
            choices: resRole.map(role =>{
              return {
                name: role.title,
                value: role.id
              }
            })

          }
      ])

      .then((answer) => {
        console.log("answer", answer)
        connection.query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
                        [
                            answer.newRole,
                            answer.action
                        ],

        //   `UPDATE employee  
        // INNER JOIN employee e
        // ON e.id = r.id
        // SET r.title = 'test22'
        // WHERE CONCAT_WS(" ", e.first_name, e.last_name) = '${answer.action}'`,
          function (err, res) {
            if (err) throw err;
            console.log(res);
            runSearch();
          }
        );
      });
  // }
    })
    })
};

// Have to initialize something in this file in order
// to have the program running, so this would make sense

// // function emp_tracking_app() {

//   const answer = await inquirer.prompt([
//     {
//       type: 'list',
//       name: 'action',
//       message: 'Select an option?',
//       choices: [
//         'View All Employees',
//         'View All Employees by Department',
//         'View All Employees by Manager',
//         'View All Roles',
//         'View All Departments',
//         'Add Employee',
//         'Remove Employee',
//         'Update Employee Manager',
//         'Update Employee Role',
//         'Add Department',
//         'Remove Department',
//         'Add Role',
//         'Exit'
//       ]
//     }
//   ]);
