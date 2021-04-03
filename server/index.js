const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const helper = require('../helpers/github.js');
const db = require('../database/index.js');
const Promise = require('bluebird');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}))

app.post('/repos', function (req, res) {
  let repos = () => {
    return new Promise( (resolve, reject) => {
      helper.getReposByUsername(req.body.username, (data) => {
        resolve(data);
      });
    });
  }
  repos(req.body.username)
    .then((data) => {
      db.save(data, (doc) => {
        res.status(201).send();
      });
    })
    .catch( (err) => {
      throw err;
    });
});

app.get('/repos', function (req, res) {
  console.log('inside app.get')
  db.Repo.find( function(err, repos) {
    if (err) {
      res.status(500).send();
    } else {
      let topRepos = repos.sort(function(a, b) {
        return parseFloat(b.stars) - parseFloat(a.stars);
      })
      topRepos = topRepos.slice(0, 25);
      topRepos.forEach(repo => {
        let oldUrl = repo.url;
        let newUrlOne = oldUrl.slice(0, 8);
        let newUrlTwo = oldUrl.slice(8, 23);
        let newUrlThree = oldUrl.slice(23);
        let updatedUrl = newUrlOne + newUrlTwo + newUrlThree;
        repo.url = updatedUrl;
      });
      let jsonArray = JSON.stringify(topRepos)
      res.send(jsonArray);
    }
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
