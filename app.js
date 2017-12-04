const fs = require('fs');
const yaml = require('js-yaml');

// Using blocking readFileSync to make sure all URLs loaded
let urls = yaml.safeLoad(fs.readFileSync('./urls.yaml'));

console.log(urls.default);
