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
      db.save(data, (doc) => {
        db.Repo.find(function (err, docs) {
          // let length = docs.length;
          // console.log('length: ', length);
          if (err) {
            return console.error(err);
          }
          else {
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
  db.Repo.find( function(err, repos) {
    if (err) {
      res.status(500).send();
    } else {
      let topRepos = repos.sort(function(a, b) {
        return parseFloat(a.stars) - parseFloat(b.stars);
      })
      topRepos = topRepos.slice(0, 25);
      let jsonArray = JSON.stringify(topRepos)
      res.send(jsonArray);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
