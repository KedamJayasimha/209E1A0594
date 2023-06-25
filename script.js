const express = require('express');
const axios = require('axios');

const app = express();
const port = 8008;

app.get('/numbers', (req, res) => {
  const { url } = req.query;
  
  // Check if the 'url' parameter is present
  if (!url) {
    return res.status(400).json({ error: 'URL parameter is required' });
  }
  
  // Convert the 'url' parameter to an array if it's a single value
  const urls = Array.isArray(url) ? url : [url];
  
  // Array to store the promises for fetching data from each URL
  const promises = [];
  
  // Fetch data from each URL
  urls.forEach(url => {
    promises.push(
      axios.get(url)
        .then(response => response.data)
        .catch(error => {
          console.error(`Error retrieving data from ${url}: ${error.message}`);
          return null;
        })
    );
  });
  
  // Wait for all promises to resolve
  Promise.all(promises)
    .then(data => {
      // Filter out the null values (failed requests) and extract the numbers
      const numbers = data.filter(item => item !== null).map(item => item.numbers).flat();
      res.json({ numbers });
    })
    .catch(error => {
      console.error(`Error fetching data: ${error.message}`);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});