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
    this.search = this.search.bind(this);
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
