const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, cb) => {
  let parsedUsername = JSON.parse(username);
  let serverUrl = 'https://api.github.com/users/';
  let endpoint = parsedUsername + '/repos';
  let url = serverUrl + endpoint;
  let options = {
    url: url,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  let repos = axios.get(options.url, {
    params: options.headers
  })
  .then(function (response) {
    let reposArray = response.data;
    cb(reposArray);
  })
  .catch(function (error) {
    throw(error);
  });

}

module.exports.getReposByUsername = getReposByUsername;
