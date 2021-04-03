import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    {props.repos.map(repo => {
      return (
        <table>
          <thead>
        <tr>
          <th>Repo</th>
        </tr>
          </thead>
          <tbody>
            <tr>
              <td>{repo.username}</td>
              <td>{repo.url}</td>
            </tr>
          </tbody>
        </table>
      )
    })}
  </div>
)

export default RepoList;
