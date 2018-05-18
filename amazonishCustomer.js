//import { SSL_OP_NO_TICKET } from "constants";

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "amazonish"
});

connection.connect(function(err) {
  if (err) throw err;

  connection.query("SELECT * FROM products", function (err, result, fields) {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
        console.log("Item ID: " + result[i].id, "\nProduct Name: " + result[i].product_name, "\nDepartment: " + result[i].department_name, "\nPrice: $" + result[i].price, "\nNumber currently in stock: " + result[i].stock_quantity);
    }
  });

  start();
});

function start() {

    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        inquirer.prompt([

            {
                type: "input",
                name: "pickProduct",
                //name: "choice",
                //type: "rawlist",
                message: "Type in the id of the product you wish to purchase.",
                // choices: function() {
                //     var choiceArray = [];
                //     for (var i = 0; i < result.length; i++) {
                //     choiceArray.push(result[i].id);
                //     }
                //     return choiceArray;
                // },
            },
            {
                type: "input",
                name: "howMany",
                message: "How many would you like to purchase?",
                validate: function(value) {
                    if (isNaN(value) === false) {
                    return true;
                    }
                    return false;
                }
            }
        ])
        
        .then(function(answer) {
        
            //console.log(answer.pickProduct);
            //console.log(answer.howMany);
            var total;
            var cost;
            var newStockQuantity;
            
            for (var i = 0; i < results.length; i++) {
                if (parseInt(answer.pickProduct) === results[i].id) {
                    total = results[i];
                    //console.log(total, "Found");
                }
            }
            //console.log(total, "Found");
            if (parseInt(answer.howMany) <= total.stock_quantity) {
                newStockQuantity = (total.stock_quantity) - parseInt(answer.pickProduct);
                cost = parseInt(answer.howMany) * (total.price);
                //console.log(newStockQuantity);
                console.log("You wish to buy", answer.howMany, total.product_name);
                console.log("That will be " + cost + " dollarinos.");
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: newStockQuantity
                        },
                        {
                            id: total.id
                        }
                    ],
                    function(error) {
                        if (error) throw err;
                    }
                    );
            } else if (parseInt(answer.howMany) > total.stock_quantity) {
                console.log("Sorry, out of stock.");
            }
        });
    });
};