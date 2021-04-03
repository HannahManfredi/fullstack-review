import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map((repo, index) => {
      return (
        <table>
          <thead>
        <tr>
          <th>{index} {repo.name} </th>
        </tr>
          </thead>
          <tbody>
            <tr>
              <td>stars {repo.stars}<a href={repo.url}>{repo.url}</a>by {repo.username}</td>
            </tr>
          </tbody>
        </table>
      )
    })}
  </div>
)

export default RepoList;
