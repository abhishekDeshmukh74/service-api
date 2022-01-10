var axios = require('axios');

var config = {
  method: 'post',
  url: 'http://localhost:5000/api/weather-service/today',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IkFEMiIsIm5hbWUiOiJBIEQgMiIsInN1YnNjcmlwdGlvblRpZXIiOiJGUkVFIiwiaWF0IjoxNjQxODQzNzM5fQ.9IpWaHEtgjO7brbx7Of0LM_bEq3fuOOzyGs2g4ihzb8',
  },
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
