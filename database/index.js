const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

//how do I sort
//what do I display
//one mongo document per repo
let repoSchema = mongoose.Schema({
  github_id: Number, //i don't control, don't introduce potential GH bugs into my DB,
  //no guarantee about size, etc.
  username: String,
  url: String, //should be a clickable
  stars: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (arrayOfRepoObjs) => {
  arrayOfRepoObjs.forEach(repo => {
    let options = {
      github_id: repo.id,
      username: repo.owner.login,
      url: repo.url,

    }
    let document = new Repo(options);
  });
}

module.exports.save = save;