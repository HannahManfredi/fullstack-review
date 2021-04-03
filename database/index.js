// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/fetcher');
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.on('conneced', () => { console.log('connected'); });
// db.once('open', function() {
//   console.log('we are connected!');
// });
const mongoose = require('mongoose');
const mongoUri = 'mongodb://localhost:27017/fetcher';
// const db = mongoose.connect(mongoUri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// });
const db = mongoose.connect(mongoUri);

//url should be a clickable
let repoSchema= new mongoose.Schema({
  github_id: Number,
  username: String,
  url: String,
  stars: Number
});

  // {github_id: 1,
  // username: 'octocat',
  // url: 'https://',
  // stars: 0}

// let repoSchema = mongoose.Schema({
//   github_id: Number,
//   username: String,
//   url: String //should be a clickable
//   // stars: Number
// });

let Repo = mongoose.model('Repo', repoSchema);

let save = (arrayOfRepoObjs, cb) => {
  console.log('inside db.save');
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
    let saved = Repo.findOneAndUpdate(query, update, options);
    console.log('saved: ', saved);
    cb(saved);
  });
}

module.exports.save = save;
module.exports.Repo = Repo;

