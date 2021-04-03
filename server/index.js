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
      helper.getReposByUsername(handle, (data) => {
        resolve(data);
      });
    });
  }
  repos(handle)
    .then((data) => {
      console.log('data: ', data);
      db.save(data, (doc) => {
        db.Repo.find(function (err, docs) {
          if (err) {
            return console.error(err);
          } else {
            console.log('docs: ', docs);
          }
        });
      });
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
