const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!');
});

//url should be a clickable
let repoSchema = mongoose.Schema({
  github_id: Number,
  username: String,
  url: String,
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (arrayOfRepoObjs, cb) => {
  arrayOfRepoObjs.forEach(repo => {
    let update = {
      github_id: repo.id,
      username: repo.owner.login,
      url: repo.url,
      stars: repo.stargazers_count
    }
    let query = {github_id: repo.id};
    let options = {};
    options.upsert = true;
    let saved = Repo.findOneAndUpdate(query, update, options);
    cb(saved);
  });
}

module.exports.save = save;
module.exports.Repo = Repo;

