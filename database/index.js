const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  github_id: Number,
  username: String,
  url: String, //should be a clickable
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema); //compile schema into a Model
//An instance of a model is called a document

let save = (arrayOfRepoObjs) => {
  console.log('save invoked inside database index.js');
  arrayOfRepoObjs.forEach(repo => {
    let options = {
      github_id: repo.id,
      username: repo.owner.login,
      url: repo.url,

    }
    let document = new Repo(options);
    Repo.create(options, function(err, document) {
      if (err) {
        throw err;
      }
    });
  });
}

// const doc = await Repo.findOne();
// console.log(doc);

module.exports.save = save;

// Complete the save function in database/index.js. This function will save the relevant data from the GitHub API into your database.

// Ensure there are no duplicate repos. If you happen to import the same repo twice, it should only show up once in your database. See the tips section about considering unique columns.

//query mongo db to see if i have saved