import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [usernameToSearch, setUsernameToSearch] = useState("");

  function handleGetUsers() {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => {
        const users = data.users.map(userJson => ({
          id: userJson.Id,
          username: userJson.Username,
          email: userJson.Email,
        }));
        setUsers(users);
      })
      .catch(error => {
        console.error(error);
        setFetchError(error.message);
      });
  }

  function handleGetUser(username) {
    fetch(`/api/user/${username}`)
      .then(res => res.json())
      .then(data => {
        const user = {
          id: data.user.Id,
          username: data.user.Username,
          email: data.user.Email,
        };
        setUsers([user]);
      })
      .catch(error => {
        console.error(error);
        setFetchError(error.message);
      });
  }

  function handleTextInput(username) {
    setUsernameToSearch(username);
  }
  

  return (
    <div className="container">
      <div className="header">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <div className="content">
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={() => handleGetUsers()}>
            Get Users
          </button>
          {users.length > 0 && users.map(user => (
            <p key={user.id}>{user.username}</p>
          ))}
          {fetchError && <p>{fetchError}</p>}
          <input type="text" onInput={(event) => handleTextInput(event.target.value)} placeholder='Search for a user...'></input>
          <button onClick={() => handleGetUser(usernameToSearch)}> Search </button>

          <p>
            Edit <code>src/App.js</code> and save to test HMR
          </p>
        </div>
      </div>
      <div className="footer">
        <p>Click on the Vite and React logos to learn more</p>
      </div>
    </div>
  );
}

export default App;
