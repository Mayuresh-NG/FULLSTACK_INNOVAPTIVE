const fs = require("fs").promises;
const path = require("path");

/** Create a database folder with the given name.
 * @param {string} databaseName - The name of the database folder to be created.
 * @returns {Promise} - A promise that resolves when the folder is created.
 */
async function createDatabaseFolder(databaseName) {
  const folderPath = path.join(__dirname, databaseName);

  try {
    // Check if the folder already exists
    await fs.access(folderPath);
    console.log(`Database folder '${databaseName}' already exists.`);
  } catch (error) {
    // If the folder does not exist, create it
    await fs.mkdir(folderPath);
    console.log(`Database folder '${databaseName}' has been created.`);
  }
}

/**Create a table file with the given name in the specified database folder.
 * If the file already exists, no action will be taken.
 * @param {string} databaseName - The name of the database folder where the table file is to be created.
 * @param {string} tableName - The name of the table file to be created.
 * @returns {Promise} - A promise that resolves when the file is created.
 */
async function createTableFile(databaseName, tableName) {
  const folderPath = path.join(__dirname, databaseName);
  const filePath = path.join(folderPath, `${tableName}.json`);

  try {
    // Check if the table file already exists
    await fs.access(filePath);
    console.log(
      `Table file '${tableName}' already exists in the '${databaseName}' database.`
    );
  } catch (error) {
    // If the file does not exist, create it and initialize with an empty array
    await fs.writeFile(filePath, "[]", "utf8");
    console.log(
      `Table file '${tableName}' has been created in the '${databaseName}' database.`
    );
  }
}

/**Add data to the specified table in the given database.
 * If the table file does not exist, it will be created.
 * @param {string} databaseName - The name of the database folder where the table file is located.
 * @param {string} tableName - The name of the table file where the data is to be added.
 * @param {Object} data - The data to be added to the table.
 * @returns {Promise} - A promise that resolves when the data is added.
 */
async function dataEntry(databaseName, tableName, data) {
  const folderPath = path.join(__dirname, databaseName);
  const filePath = path.join(folderPath, `${tableName}.json`);

  try {
    // Read existing data from the file
    const existingData = await fs.readFile(filePath, "utf8");
    let dataArray = [];

    // Parse existing data (if any)
    if (existingData) {
      dataArray = JSON.parse(existingData);
    }

    // Append new data to the array
    dataArray.push(data);

    // Write the updated data back to the file
    await fs.writeFile(filePath, JSON.stringify(dataArray, null, 2), "utf8");
    console.log(
      `Data has been added to the '${tableName}' table in the '${databaseName}' database.`
    );
  } catch (error) {
    console.error(
      `Error in dataEntry for '${tableName}' table in the '${databaseName}' database:`,
      error.message
    );
  }
}

/**Read data from the specified table in the given database.
 * @param {string} databaseName - The name of the database folder where the table file is located.
 * @param {string} tableName - The name of the table file from where the data is to be read.
 * @returns {Promise<Array>} - A promise that resolves with an array of data from the table.
 */
async function readData(databaseName, tableName) {
  const folderPath = path.join(__dirname, databaseName);
  const filePath = path.join(folderPath, `${tableName}.json`);

  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(
      `Error reading data from the '${tableName}' table in the '${databaseName}' database.`,
      error.message
    );
    return [];
  }
}

/**List all databases in the system.
 * @returns {Promise} - A promise that resolves with an array of database names.
 */
async function listDatabase() {
  const folderPath = path.join(__dirname);

  try {
    const files = await fs.readdir(folderPath);
    const subfolders = await Promise.all(
      files.map(async (file) => {
        const fullPath = path.join(folderPath, file);
        const stats = await fs.stat(fullPath);
        return stats.isDirectory() ? file : null;
      })
    );

    console.log(`All databases`);
    subfolders.filter(Boolean).forEach((subfolder) => {
      console.log(subfolder);
    });
  } catch (error) {
    console.error(`Error listing databases:`, error.message);
  }
}

/**List all tables in the specified database.
 * @param {string} databaseName - The name of the database folder whose tables are to be listed.
 * @returns {Promise<Array>} - A promise that resolves with an array of table names.
 */
async function listFiles(databaseName) {
  const folderPath = path.join(__dirname, databaseName);

  try {
    const files = await fs.readdir(folderPath);
    const fileList = await Promise.all(
      files.map(async (file) => {
        const fullPath = path.join(folderPath, file);
        const stats = await fs.stat(fullPath);
        return stats.isFile() ? file : null;
      })
    );

    console.log(`Tables in the '${databaseName}' database :`);
    fileList.filter(Boolean).forEach((file) => {
      console.log(file);
    });
  } catch (error) {
    console.error(
      `Error listing files in the '${databaseName}' database :`,
      error.message
    );
  }
}

/**Update data in the specified table in the given database.
 * @param {string} databaseName - The name of the database folder where the table file is located.
 * @param {string} tableName - The name of the table file where the data is to be updated.
 * @param {number} targetId - The id of the data object to be updated.
 * @param {Object} newData - The new data to be updated.
 * @returns {Promise} - A promise that resolves when the data is updated.
 */
async function updateData(databaseName, tableName, targetId, newData) {
  const folderPath = path.join(__dirname, databaseName);
  const filePath = path.join(folderPath, `${tableName}.json`);

  try {
    const existingData = await fs.readFile(filePath, "utf8");
    let dataArray = [];

    if (existingData) {
      dataArray = JSON.parse(existingData);
    }

    const targetIndex = dataArray.findIndex((item) => item.id === targetId);

    if (targetIndex !== -1) {
      dataArray[targetIndex] = { ...dataArray[targetIndex], ...newData };

      await fs.writeFile(filePath, JSON.stringify(dataArray, null, 2), "utf8");
      console.log(
        `Data with id '${targetId}' has been updated in the '${tableName}' table in the '${databaseName}' database.`
      );
    } else {
      console.log(
        `Data with id '${targetId}' not found in the '${tableName}' table in the '${databaseName}' database.`
      );
    }
  } catch (error) {
    console.error(
      `Error updating data in the '${tableName}' table in the '${databaseName}' database:`,
      error.message
    );
  }
}

/**Delete data with the specified id from the specified table in the given database.
 * @param {string} databaseName - The name of the database folder where the table file is located.
 * @param {string} tableName - The name of the table file where the data is located.
 * @param {number} targetId - The id of the data object to be deleted.
 * @returns {Promise} - A promise that resolves when the data is deleted.
 */
async function deleteData(databaseName, tableName, targetId) {
  const folderPath = path.join(__dirname, databaseName);
  const filePath = path.join(folderPath, `${tableName}.json`);

  try {
    const existingData = await fs.readFile(filePath, "utf8");
    let dataArray = [];

    if (existingData) {
      dataArray = JSON.parse(existingData);
    }

    const targetIndex = dataArray.findIndex((item) => item.id === targetId);

    if (targetIndex !== -1) {
      dataArray.splice(targetIndex, 1);

      await fs.writeFile(filePath, JSON.stringify(dataArray, null, 2), "utf8");
      console.log(
        `Data with id '${targetId}' has been deleted from the '${tableName}' table in the '${databaseName}' database.`
      );
    } else {
      console.log(
        `Data with id '${targetId}' not found in the '${tableName}' table in the '${databaseName}' database.`
      );
    }
  } catch (error) {
    console.error(
      `Error deleting data from the '${tableName}' table in the '${databaseName}' database:`,
      error.message
    );
  }
}

/**Delete the specified database folder and its contents.
 * @param {string} databaseName - The name of the database folder to be deleted.
 * @returns {Promise} - A promise that resolves when the database folder is deleted.
 */
async function deleteDatabase(databaseName) {
  const folderPath = path.join(__dirname, databaseName);

  try {
    await fs.access(folderPath);
    await fs.rmdir(folderPath, { recursive: true });
    console.log(
      `Database folder '${databaseName}' and its contents have been deleted.`
    );
  } catch (error) {
    console.log(`Database folder '${databaseName}' does not exist.`);
  }
}

/** Delete the specified table file from the given database folder.
 * @param {string} databaseName - The name of the database folder where the table file is located.
 * @param {string} tableName - The name of the table file to be deleted.
 * @returns {Promise} - A promise that resolves when the table file is deleted.
 */
async function deleteTableFile(databaseName, tableName) {
  const folderPath = path.join(__dirname, databaseName);
  const filePath = path.join(folderPath, `${tableName}.json`);

  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
    console.log(
      `Table file '${tableName}' in the '${databaseName}' database has been deleted.`
    );
  } catch (error) {
    console.log(
      `Table file '${tableName}' in the '${databaseName}' database does not exist.`
    );
  }
}

// CALL this functions to use code
/** Test function for creating a new database, table, and data entry.
 */
async function testFunctionCreate() {
  const newData = {
    id: 1,
    name: "Mayuresh",
    age: 22,
    department: "IT",
  };

  // Create operation
  await createDatabaseFolder("db1");
  await createTableFile("db1", "users");
  await dataEntry("db1", "users", newData);

  // Read operation
  const readResult = await readData("db1", "users");
  console.log("Read Result after Create:", readResult);
}

/**Test function for updating existing data in the database.
 */
async function testFunctionUpdate() {
  const updateDataInput = {
    id: 1,
    department: "HR",
  };
  await updateData("db1", "users", 1, updateDataInput);

  // Read updated data
  const updatedReadResult = await readData("db1", "users");
  console.log("Updated Read Result:", updatedReadResult);
}

/**Test function for deleting data from the database.
 */
async function testFunctionDeleteData() {
  const databaseName = "db1";
  const tableName = "users";
  const targetId = 1;

  // Delete data or record
  await deleteData(databaseName, tableName, targetId);

  // Read data after delete operation
  const afterDeleteReadResult = await readData(databaseName, tableName);
  console.log("After Delete Read Result:", afterDeleteReadResult);
}

/** Test function for deleting a table file from the database.
 */
async function testFunctionDeleteTableFile() {
  const databaseName = "db1";
  const tableName = "users";

  // Delete table file
  await deleteTableFile(databaseName, tableName);
}

/** Test function for deleting a database folder.
 */
async function testFunctionDeleteDatabase() {
  const databaseName = "db1";

  // Delete database folder
  await deleteDatabase(databaseName);
}

// Controllers
// testFunctionCreate();

// testFunctionUpdate();

// testFunctionDeleteData();
// testFunctionDeleteTableFile();
// testFunctionDeleteDatabase();

// listDatabase();
// listFiles("db1");
