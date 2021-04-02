const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (username, cb) => {

  // let url = 'https://api.github.com/users/'.concat(`${username}/repos`);
  let url = 'https://api.github.com/users/HannahManfredi/repos';
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
