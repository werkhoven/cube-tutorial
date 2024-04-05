const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Function to read a YAML file and convert it to a JavaScript object
function readYamlFile(filePath) {
    try {
        console.log(`Reading file: ${filePath}`);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return  yaml.load(fileContents);
    } catch (e) {
        console.error(`Failed to read or parse YAML file: ${e}`);
        return null; // Return null in case of an error
    }
}

// A function that simulates returning FileContent[] asynchronously
function readAllYamlFiles(directoryPath) {
    return new Promise((resolve) => {
        // read all yaml files in a directory
        console.log(`REPOSITORY FACTORY: Reading files from directory: ${directoryPath}`);
        let fileContents = [];
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }

            files.forEach(file => {
                if (path.extname(file) === '.yaml' || path.extname(file) === '.yml') {
                    let data = readYamlFile(path.join(directoryPath, file));
                    fileContents.push({file: file, content: data});
                }
            });
        });
        resolve(fileContents);
    });
}

// Simulating the SchemaRepository object with a function property
// Initialize schema repository with a directory path
class SimpleSchemaRepository {

    constructor(directoryPath) {
        this.directoryPath = directoryPath;
    }
    // Function to read all schema files in a directory
    async dataSchemaFiles() {
        return readAllYamlFiles(this.directoryPath);
    }
}
module.exports = { SimpleSchemaRepository };