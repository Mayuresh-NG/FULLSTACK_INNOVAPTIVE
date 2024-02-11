const fs = require('fs')
const ob = {
    key1: 'value1',
    key2: 'value2',
    key3: 'value3'
  };
  
  const jsonContent = JSON.stringify(ob, null,2);
  console.log(jsonContent);

  fs.writeFileSync('object_file.json', jsonContent, 'utf-8');

const loadedContent = fs.readFileSync('object_file.json', 'utf-8');
console.log(loadedContent)
const loadedObject = JSON.parse(loadedContent);

console.log(loadedObject);