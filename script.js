const url = 'http://104.211.219.98/train/register';
const data = {
  companyName: 'Train Central',
  ownertiame: 'Ram',
  rolltio: '1',
  cerEmail: 'ram@abc.edu',
  accessCode: 'jOBrNa'
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
  .then(response => response.json())
  .then(result => {
    console.log(result); // Handle the response from the server
  })
  .catch(error => {
    console.error(error); // Handle any errors that occurred during the request
  });