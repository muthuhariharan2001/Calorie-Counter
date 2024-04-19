var serialNumber = 0; // Initialize the serial number
// Load existing data from local storage on page load
window.onload = function () {
loadTableData();
};
function updateTable(foodName, calories, imagePath, cost) {
// Increment the serial number
serialNumber++;

// Calculate total calories based on quantity
var totalCalories = calculateCalories(1, calories); // Assuming a default quantity of 1

// Create a new row in the table
var table = document.getElementById("foodTable");
var newRow = table.insertRow(-1); // -1 inserts at the last position

// Add cells to the row
var cell1 = newRow.insertCell(0); // Serial number
var cell2 = newRow.insertCell(1); // Image
var cell3 = newRow.insertCell(2); // Quantity
var cell4 = newRow.insertCell(3); // Food Name
var cell5 = newRow.insertCell(4); // Calories
var cell6 = newRow.insertCell(5); // Price

// Set the values in the cells
cell1.innerHTML = serialNumber;
cell2.innerHTML = '<img src="' + imagePath + '" alt="Selected Food" width="60px" height="80px">';
cell4.innerHTML = foodName;

// Create the select element
var select = document.createElement("select");
select.className = "quantity";
select.name = "quantity";
select.required = true;
select.onchange = function () {
checkTable(newRow); // Pass the row to the correct checkTable function
calculateTotalCalories(); // Update total calories when quantity changes
};

// Set the options for the select element
var options = ["- - Select One - -", "100 Grams", "1 TableSpoon", "Single Piece"];
for (var i = 0; i < options.length; i++) {
var option = document.createElement("option");
option.value = options[i];
option.text = options[i];
select.add(option);
}
// Set the select element in the cell
cell3.appendChild(select);

// Set initial values for calories and price
cell5.innerHTML = calculateCalories(1, calories); // Assuming a default quantity of 1
cell6.innerHTML = cost;

// Save the updated table data to local storage
saveTableData();
}

function checkTable(row) {
var select = row.cells[2].getElementsByTagName("select")[0];
var selectedOption = select.options[select.selectedIndex].value;

// You may need to adjust this based on your actual data and calculations
var caloriesPerUnit = 0;
var pricePerUnit = 0;

switch (selectedOption) {
case "100 Grams":
    caloriesPerUnit = 10; // Replace with your actual value
    pricePerUnit = 5; // Replace with your actual value
    break;
case "1 TableSpoon":
    caloriesPerUnit = 5; // Replace with your actual value
    pricePerUnit = 2; // Replace with your actual value
    break;
case "Single Piece":
    caloriesPerUnit = 15; // Replace with your actual value
    pricePerUnit = 8; // Replace with your actual value
    break;
// Add more cases as needed

default:
    caloriesPerUnit = ""; // Replace with your actual value
    pricePerUnit = "";
    // Handle the default case or leave it empty
    break;
}

// Assuming calories and price are in the 5th and 6th cells
row.cells[4].innerHTML = calculateCalories(1, caloriesPerUnit); // Assuming a default quantity of 1
row.cells[5].innerHTML = pricePerUnit;

// Save the updated table data to local storage
saveTableData();
}

function calculateCalories(quantity, caloriesPerUnit) {
// Assuming a simple calculation, you may need to adjust this based on your requirements
return quantity * caloriesPerUnit;
}

function calculateTotalCalories() {
// Assuming there's a loop through all rows in the table to calculate the total calories
var table = document.getElementById("foodTable");
var totalCalories = 0;

for (var i = 1; i < table.rows.length; i++) {
var row = table.rows[i];
// Assuming calories are in the 5th cell
var calories = parseInt(row.cells[4].innerHTML);
totalCalories += calories;
}

// Update the total calories display
document.getElementById("totalCalories").innerHTML = totalCalories;

// Save the updated total calories to local storage
saveTableData();
}

function saveTableData() {
var tableData = [];
var table = document.getElementById("foodTable");

// Iterate through rows and save data to array
for (var i = 1; i < table.rows.length; i++) {
var row = table.rows[i];
var rowData = {
    foodName: row.cells[3].innerHTML,
    calories: parseInt(row.cells[4].innerHTML),
    price: parseInt(row.cells[5].innerHTML)
};
tableData.push(rowData);
}

// Save data to local storage
sessionStorage.setItem("foodTableData", JSON.stringify(tableData));
}

function loadTableData() {
var savedTableData = sessionStorage.getItem("foodTableData");

if (savedTableData !== null) {
var tableData = JSON.parse(savedTableData);
for (var i = 0; i < tableData.length; i++) {
    var data = tableData[i];
    updateTable(data.foodName, data.calories, "", data.price);
}
}
}
    
function checkActivity() {
    var act = document.getElementById("activity");
    
    var label_btn = document.getElementById("label_btn");
    var label_btn_1 = document.getElementById("label_btn_1");
    var label_btn_2 = document.getElementById("label_btn_2");
    var label_btn_3 = document.getElementById("label_btn_3");
    
    if (act.value == "Running") {
        label_btn.innerHTML = "Running 100metres";
        label_btn_1.innerHTML = "Running 500metres";
        label_btn_2.innerHTML = "Running 1km";
        label_btn_3.innerHTML = "Running 2kms";
    } 
    else if (act.value == "Cycling") {
        label_btn.innerHTML = "Cycling 100metres";
        label_btn_1.innerHTML = "Cycling 500metres";
        label_btn_2.innerHTML = "Cycling 1km";
        label_btn_3.innerHTML = "Cycling 2kms";
    } 
    else if (act.value == "Swimming") {
        label_btn.innerHTML = "Swimming 100metres";
        label_btn_1.innerHTML = "Swimming 500metres";
        label_btn_2.innerHTML = "Swimming 1km";
        label_btn_3.innerHTML = "Swimming 2kms";
    } 
    else if (act.value == "Walking") {
        label_btn.innerHTML = "Walking 100metres";
        label_btn_1.innerHTML = "Walking 500metres";
        label_btn_2.innerHTML = "Walking 1km";
        label_btn_3.innerHTML = "Walking 2kms";
    } 
    else if (act.value == "Jogging") {
        label_btn.innerHTML = "Jogging 100metres";
        label_btn_1.innerHTML = "Jogging 500metres";
        label_btn_2.innerHTML = "Jogging 1km";
        label_btn_3.innerHTML = "Jogging 2kms";
    } 
    else {
        label_btn.innerHTML = "";
        label_btn_1.innerHTML = "";
        label_btn_2.innerHTML = "";
        label_btn_3.innerHTML = "";
    }
}