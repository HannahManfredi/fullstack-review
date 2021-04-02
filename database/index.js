const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!');
});

let repoSchema = mongoose.Schema({
  github_id: Number,
  username: String,
  url: String, //should be a clickable
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema); //compile schema into a Model
//An instance of a model is called a document
//Repo = Kitten

let save = (arrayOfRepoObjs, cb) => {
  console.log('save invoked inside database index.js');
  console.log('arrayOfRepoObjs: ', arrayOfRepoObjs);
  arrayOfRepoObjs.forEach(repo => {
    let update = {
      github_id: repo.id,
      username: repo.owner.login,
      url: repo.url,
      stars: repo.stargazers_count
    }
    // document.save(function (err, doc) {
    //   if (err) {
    //     return console.error(err);
    //   } else {
    //     cb(doc);
    //   }
    // });
    let query = {github_id: repo.id};
    let options = {};
    options.upsert = true;
    let saved = Repo.findOneAndUpdate(query, update, options);
    cb(saved);
  });
}

module.exports.save = save;
module.exports.Repo = Repo;

