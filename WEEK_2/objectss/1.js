class Car {
    constructor(company, model) {
        this.company = company;
        this.model = model;
    }

    display() {
        console.log(`Company: ${this.company}`, `Model: ${this.model}`);
    }
}

const c1 = new Car("BMW", "X1");

const cars = [new Car("Hyundai", "Creta"), new Car("Audi", "R8"), c1];

cars.forEach(c => c.display());

console.log("\n")
// create an oject.How to access all members of an object
class p{
    constructor(names)
    {
        this.names=names
    }
}

let person = {name:"Mayuresh Gorantiwar", age:22}; 
console.log(person.name +" is "+ person.age+" years old.");

let obj = {
    names : ""
}

// let y = {names:"Nitin"}
console.log(obj.names)

// Crud a file
const fs = require('fs');

const dataToWrite = "Hello, this is the content to be written to the file";
fs.writeFile("example.txt", dataToWrite, (err) => {
  if (err) throw err;
  console.log("File has been created");
});

const dataToAppend = '\nThis content will be appended to the file';
fs.appendFile('example.txt', dataToAppend, (err) => {
  if (err) throw err;
  console.log('File has been updated');
});

fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('File content:', data);
  });

// fs.unlink('exampe.txt', (err) => {
//   if (err) throw err;
//   console.log('File has been deleted.');
// });

