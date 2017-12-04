const fs = require('fs');
const yaml = require('js-yaml');
const express = require('express');
const app = express();

// Using blocking readFileSync to make sure all URLs loaded
let urls = yaml.safeLoad(fs.readFileSync('./urls.yaml'));

// Check for a default route; set one if one does not exist
if (typeof(urls.default) === 'undefined') {
  urls.default = 'https://github.com/karlstolley/sharty'
}

app.get(/\/[a-z0-9-]+$/, (req, res) => {
  let short = req.url.substring(1); // trim initial slash
  let destination = urls[short];
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
