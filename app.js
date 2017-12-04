const fs = require('fs');
const yaml = require('js-yaml');
const express = require('express');
const app = express();

// TODO: Less brittle path to the YAML file
const yaml_file = './urls.yaml'

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
// TODO: Handle an erroneous trailing slash
app.get(/\/[a-z0-9-]+$/, (req, res) => {
  let slug = req.url.substring(1); // trim initial slash
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
