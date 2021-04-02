const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const helper = require('../helpers/github.js');
const db = require('../database/index.js');
const Promise = require('bluebird');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/repos', function (req, res) {
  let obj = JSON.parse(JSON.stringify(req.body));
  let handle = '';
  for (let key in obj) {
    handle += key;
  }
  let repos = () => {
    return new Promise( (resolve, reject) => {
      let dataArray;
      helper.getReposByUsername(handle, (data) => {
        console.log('Successfully retrieved data from GH');
        console.log('data: ', data);
        dataArray = data;
      });
      resolve(dataArray);
    });
  }
  repos(handle)
    .then((data) => {
      console.log('data: ', data);
      // db.save(data, () => {
        //       console.log('repos successfully saved into mongo db');
        //     });
    })
    .catch( (err) => {
      throw err;
    });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

// TASK:
// When a user types a GitHub username into the text field, use jQuery's ajax method to send a POST
//request to /repos (you'll have to fix the bug in the Search Component first).