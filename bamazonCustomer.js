var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: 'root',

    password: 'password',
    database: 'bamazon'
});


connection.connect(function (err) {
    console.log("connected");
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {



  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to buy on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What product would you like to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How much would you like to buy?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        // determine if there is enough quantity in the db
        if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
          // bid was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: (chosenItem.stock_quantity - answer.quantity)
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("purchased successfully!");
              start();
            }
          );
        }
        else {
          // bid wasn't high enough, so apologize and start over
          console.log("Your bid was too low. Try again...");
          start();
        }
      });
  });
}










    //     if (err) throw err;

    //     inquirer.prompt(
    //         [
    //             {
    //                 name: 'item',
    //                 type: 'list',
    //                 message: 'Which item would you like to purchase?',
    //                 choices: function () {
    //                     return res.map(function (item) {
    //                         return item.item_id + ' | ' + item.product_name + ' | Price: $' + item.price + ' | Quantity Available: ' + item.stock_quantity;
    //                     });
    //                 }
    //             },
    //             {
    //                 name: 'quantity',
    //                 type: 'input',
    //                 message: 'What quantity would you like to purchase?'
    //             }
    //         ]
    //     ).then(
    //         function (answers) {

    //             connection.query(
    //                 "UPDATE products SET ? WHERE ?",
    //                 [
    //                     {
    //                         stock_quantity: parseInt(res.stock_quantity - answers.quantity)
    //                     },
    //                     {
    //                         item_id: parseInt(answers.item.split(' | ')[0], 10)
    //                     }
    //                 ],
    //                 function (err) {
    //                     if (err) throw err;
    //                 }
    //             );
    //         }
    //     );

    // });
