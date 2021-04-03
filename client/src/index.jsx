import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      repos: []
    }
    this.getRepos = this.getRepos.bind(this);
    this.search = this.search.bind(this);
    // this.makeUrlClickable = this.makeUrlClickable.bind(this);
  }

  componentDidMount() {
    this.getRepos((data) => {
        this.setState({
          repos: data
        });
    });
  }

  // makeUrlClickable(data, cb) {
  //   console.log('data inside clickable: ', data);
  //   data.forEach(repo => {
  //     console.log('repo: ', repo);
  //     let clickable = repo.url.replace(/(\s)(http:\/\/[^\s]+)(\s)/g, '$1<a href="$2">$2</a>$3');
  //     repo.url = clickable;
  //     console.log(repo.url);
  //   });
  //   cb(data);
  // }

  getRepos(cb) {
    console.log(`inside get repos`);
    let topTwentyFiveRepos = [];
    $.ajax({
      type: "GET",
      url: "http://localhost:1128/repos",
      success: function(data) {
        topTwentyFiveRepos = JSON.parse(data);
        console.log('topTwentyFiveRepos: ', topTwentyFiveRepos);
        cb(topTwentyFiveRepos);
      }
    });
  }

  search (term) {
    console.log(`${term} was searched`);
    let sendableTerm = JSON.stringify(term);
    $.ajax({
      type: "POST",
      url: "http://localhost:1128/repos",
      data: sendableTerm,
      success: function(response) {
        console.log(`Post successfully sent ${response}`);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
