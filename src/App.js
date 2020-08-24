import React, { useEffect, useState } from 'react';

import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(({ data }) => setRepositories(data));
  }, []);

  async function handleAddRepository() {
    api
      .post('/repositories', {
        title: `Repo added by client api at ${Date.now()}`,
        url: 'http://localhost/teste-repo',
        techs: ['Node.js', 'React.js'],
      })
      .then(({ data }) => {
        setRepositories([...repositories, data]);
      });
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then((res) => {
      setRepositories(repositories.filter((repo) => repo.id !== id));
    });

    console.log(id);
  }

  return (
    <div>
      <ul data-testid='repository-list'>
        {repositories.map((repo) => {
          return (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
