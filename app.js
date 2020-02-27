const fs = require('fs');
const yaml = require('js-yaml');
const express = require('express');
const app = express();

const yaml_file = `${__dirname}/urls.yaml`;
// console.log(yaml_file);

// Check for a default route; set one if one does not exist
function checkDefaultURL() {
  if (typeof(urls.default) === 'undefined') {
    urls.default = 'https://github.com/karlstolley/sharty'
  }
}

let urls = yaml.safeLoad(fs.readFileSync(yaml_file));
checkDefaultURL();

fs.watch(yaml_file, (event, file) => {
// TODO: Is readFileSync the best choice here?
  urls = yaml.safeLoad(fs.readFileSync(file));
  checkDefaultURL();
});

// Match any slug of lowercase letters, numbers, or the hyphen
app.get(/\/[a-z0-9-]+(\/?)$/, (req, res) => {
  let slug = req.url.match(/[a-z0-9-]+/); // return just the slug value
  let destination = urls[slug];
  // If the slug/destination doesn't exist, redirect to the default
  if (typeof(destination) === 'undefined') {
    destination = urls.default;
  }
  res.redirect(301,destination);
})

// Direct all other requests to the default URL
app.use((req, res) => {
  res.redirect(301, urls.default);
})

app.listen(3000);
