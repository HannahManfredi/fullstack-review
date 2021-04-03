const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', () => { console.log('connected'); });

//url should be a clickable
let repoSchema= new mongoose.Schema({
  github_id: Number,
  username: String,
  url: String,
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (arrayOfRepoObjs, cb) => {
  // console.log('arrayOfRepoObjs: ', arrayOfRepoObjs);
  arrayOfRepoObjs.forEach(repo => {
    let stargazers = repo.stargazers_count;
    let update = {
      github_id: repo.id,
      username: repo.owner.login,
      url: repo.url,
      stars: stargazers
    };
    let query = {github_id: repo.id};
    let options = {};
    options.upsert = true;
    Repo.findOneAndUpdate(query, update, options, () => {
      cb();
    });
  });
}

module.exports.save = save;
module.exports.Repo = Repo;

