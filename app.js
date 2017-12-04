const fs = require('fs');
const yaml = require('js-yaml');
const express = require('express');
const app = express();

// Using blocking readFileSync to make sure all URLs loaded
let urls = yaml.safeLoad(fs.readFileSync('./urls.yaml'));

app.get(/\/[a-z0-9-]+$/, (req, res) => {
  res.send(`Requested ${req.url}, send to ${urls[req.url.substring(1)]}`);
})

app.listen(3000);
