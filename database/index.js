const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

//how do I sort
//what do I display
//one mongo document per repo
let repoSchema = mongoose.Schema({
  _id: Number, //go with native optimizations
  github_id: Number, //i don't control, don't introduce potential GH bugs into my DB, no guarantee about size, etc.
  username: String,
  usernameId: Number,
  url: String,
  repos_url: String,
  //^should be a clickable
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

module.exports.save = save;