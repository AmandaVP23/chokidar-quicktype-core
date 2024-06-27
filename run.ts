import { generateTypes } from "./generate";

const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');

console.log('Is watching for changes!');

chokidar.watch('./translation.json').on('change', (filename: string) => {
    console.log('File changed');

    const data = fs.readFileSync(path.join(__dirname, filename), 'utf8');
    generateTypes(data);
});


