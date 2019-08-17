var mysql = require("mysql");
// var table = require('cli-table');
var Table = require('cli-table')

var inquirer = require("inquirer");


var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazon_DB"
  });
  
connection.connect(function (err) {
    if (err) throw err
    start();
});

function start() {

    inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Welcome to bamazon! Would you like to see our top 10 popular products?',
        },
    ]).then(function (answer) {
        if (answer.confirm === true){
            stockinventory();
        }
        else {
            console.log('Thanks for visiting. Come back again soon!'),
            connection.end();
        }
    });
}
   function stockinventory() {
    connection.query('SELECT * FROM products', function (err, results) {
        if (err) throw err;
        
        var itemsTable = new Table({
            head: ['Item ID', 'Product Name', 'Department name', 'Price', 'Stock Quantity'],
            colWidths:[15,20,20,20,20]
    });
   viewTable();
   
   function viewTable() {
    connection.query('SELECT * FROM products', function (err, results) {
        if (err) throw err;
        for (var i = 0; i < results.length; i++) {
       itemid = results[i].item_id,
       productname = results[i].product_name,
       departmentname = results[i].department_name,
       price = results[i].price,
       stockquantity = results[i].stock_quantity;
      
            itemsTable.push([results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]);
        }
        console.log(itemsTable.toString())
    
    });
};
    },
    )
    purchaseID();

function purchaseID() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the product ID you would like to buy.',
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many would you like to buy?',
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
          ]).then(function (answer) {
            connection.query("SELECT * FROM products WHERE item_id=?", answer.item_id, function(err, results) {
                for (var i = 0; i < results.length; i++) {
            
          if (results[i].stock_quantity>answer.quantity) {
              console.log("Sucess! There are items in stock ")
              console.log("Order has been placed.")
              console.log("Item ID: " + results[i].item_id)
              console.log("Product: " + results[i].product_name)
              console.log("Department name: " + results[i].department_name)
              console.log("Price: " + results[i].price)
              console.log("Quantity: " + answer.quantity)
              console.log("Total Price: " + results[i].price*answer.quantity)
              console.log("================================================")
              console.log("---Updated Inventory-----")
            
              var updatedquantity = results[i].stock_quantity - answer.quantity;
              var productId = (answer.item_id);
              var productname=results[i].product_name
              console.log("Item Id: " + productId )
              console.log("Product: " + productname )
              console.log("Quantity: " + updatedquantity )
            } else {
              console.log("Sorry! There is insufficient quantity. Please try again.")
          }
        }
        });
    }); 
    updatedInventory()
}
    
var updatedquantity = results[i].stock_quantity - answer.quantity;
        function updatedInventory () {
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: updatedquantity
            }, {
                item_id: productId
            }], function(err, res) {});
          console.log('New inventory quantity:' + productID + updatedquantity)
        }
    }