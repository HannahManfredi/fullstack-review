const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', () => { console.log('connected'); });

let repoSchema = new mongoose.Schema({
  github_id: Number,
  name: String,
  username: String,
  url: String,
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (arrayOfRepoObjs, cb) => {
  console.log('arrayOfRepoObjs: ', arrayOfRepoObjs);
  arrayOfRepoObjs.forEach(repo => {
    console.log('repo: ', repo);
    let stargazers = repo.stargazers_count;
    let update = {
      github_id: repo.id,
      name: repo.name,
      username: repo.owner.login,
      url: repo.html_url,
      stars: stargazers,
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


// github_id: 226416220
// name: "advanced-react-rerecord"
// stars: 259
// url: "https://api.github.com/repos/wesbos/advanced-react-rerecord"
// username: "wesbos"
// __v: 0
// _id: "6068c1f88c3a5db5f2bb3c12"