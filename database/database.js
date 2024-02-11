const fs = require('fs');
const path = require('path');

/** Function to create a new database */
function createDatabaseFolder(databaseName) {
  const folderPath = path.join(__dirname, databaseName);

  // Check if the folder already exists
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`Database folder '${databaseName}' has been created.`);
  } else {
    console.log(`Database folder '${databaseName}' already exists.`);
  }
}

/** Function to create a new table in a specific database folder */
function createTableFile(databaseName, tableName) {
  const folderPath = path.join(__dirname, databaseName);
  const filePath = path.join(folderPath, `${tableName}.txt`);

  // Check if the table file already exists
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]', 'utf8'); // Initialize with an empty array if the file is new
    console.log(`Table file '${tableName}' has been created in the '${databaseName}' database.`);
  } else {
    console.log(`Table file '${tableName}' already exists in the '${databaseName}' database.`);
  }
}

/** Function to enter data into a table file */
function dataEntry(databaseName, tableName, data) {
  const folderPath = path.join(__dirname, databaseName);
  const filePath = path.join(folderPath, `${tableName}.txt`);

  // Read existing data from the file
  const existingData = fs.readFileSync(filePath, 'utf8');
  let dataArray = [];

  // Parse existing data (if any)
  if (existingData) {
    dataArray = JSON.parse(existingData);
  }

  // Append new data to the array
  dataArray.push(data);

  // Write the updated data back to the file
  fs.writeFileSync(filePath, JSON.stringify(dataArray, null, 2), 'utf8');
  console.log(`Data has been added to the '${tableName}' table in the '${databaseName}' database.`);
}

/** Function to read data from a table file */
function readData(databaseName, tableName) {
  const folderPath = path.join(__dirname, databaseName);
  const filePath = path.join(folderPath, `${tableName}.txt`);

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading data from the '${tableName}' table in the '${databaseName}' database.`, error);
    return [];
  }
}

/** Function to update data in a table file */
function updateData(databaseName, tableName, targetId, newData) {
  const folderPath = path.join(__dirname, databaseName);
  const filePath = path.join(folderPath, `${tableName}.txt`);

  // Read existing data from the file
  const existingData = fs.readFileSync(filePath, 'utf8');
  let dataArray = [];

  // Parse existing data (if any)
  if (existingData) {
    dataArray = JSON.parse(existingData);
  }

  // Find the index of the target data based on some identifier (e.g., id)
  const targetIndex = dataArray.findIndex(item => item.id === targetId);

  // If the target data is found, update it
  if (targetIndex !== -1) {
    dataArray[targetIndex] = { ...dataArray[targetIndex], ...newData };

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(dataArray, null, 2), 'utf8');
    console.log(`Data with id '${targetId}' has been updated in the '${tableName}' table in the '${databaseName}' database.`);
  } else {
    console.log(`Data with id '${targetId}' not found in the '${tableName}' table in the '${databaseName}' database.`);
  }
}

/** Function to delete data from a table file */
function deleteData(databaseName, tableName, targetId) {
  const folderPath = path.join(__dirname, databaseName);
  const filePath = path.join(folderPath, `${tableName}.txt`);

  // Read existing data from the file
  const existingData = fs.readFileSync(filePath, 'utf8');
  let dataArray = [];

  // Parse existing data (if any)
  if (existingData) {
    dataArray = JSON.parse(existingData);
  }

  // Find the index of the target data based on some identifier (e.g., id)
  const targetIndex = dataArray.findIndex(item => item.id === targetId);

  // If the target data is found, delete it
  if (targetIndex !== -1) {
    dataArray.splice(targetIndex, 1);

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(dataArray, null, 2), 'utf8');
    console.log(`Data with id '${targetId}' has been deleted from the '${tableName}' table in the '${databaseName}' database.`);
  } else {
    console.log(`Data with id '${targetId}' not found in the '${tableName}' table in the '${databaseName}' database.`);
  }
}

// Example usage
createDatabaseFolder('db2');
createTableFile('db2', 'users');

const newData = {
  id: 1,
  name: 'Mayuresh Gorantiwar',
  age: 22,
  department: 'HR'
};

// Create operation
dataEntry('db2', 'users', newData);

// Read operation
const readResult = readData('db2', 'users');
console.log('Read Result:', readResult);

// Update operation
const updateDataInput = {
  id: 1,
  department: 'IT'
};
updateData('db2', 'users', 1, updateDataInput);

// Read updated data
const updatedReadResult = readData('db2', 'users');
console.log('Updated Read Result:', updatedReadResult);

// Delete operation
deleteData('db2', 'users', 1);

// Read data after delete operation
const afterDeleteReadResult = readData('db2', 'users');
console.log('After Delete Read Result:', afterDeleteReadResult);