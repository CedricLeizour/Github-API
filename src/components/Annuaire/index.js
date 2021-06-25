// == Import npm
import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import logo from 'src/assets/images/logo-github.png';
import axios from 'axios';

// == Import
import SearchBar from 'src/components/SearchBar';
import Message from 'src/components/Message';
import ReposResult from 'src/components/ReposResult';
import MoreResultBtn from 'src/components/MoreResultBtn';
import './styles.scss';

//let page = 1;

// == Composant
const Annuaire = () => {
  const [total, setTotal] = useState(0);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('Veuillez lancer une recherche');
  const [negativeMessage, setNegativeMessage] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const searchRepositories = (existingResults) => {
    console.log(search, page, existingResults);
    setLoading(true);
    setMessage('Recherche en cours, veuillez patienter ...');
    axios.get(`https://api.github.com/search/repositories?q=${search}&sort=stars&order=desc&page=${page}&per_page=9`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('Une erreur est survenue durant la recherche des repositories');
        }
        return response.data;
      })
      .then((data) => {
      // On met à jour le total de repositories dans le state
        setTotal(data.total_count);
        // On met à jour les repositories dans le state
        setRepos([...existingResults, ...data.items]);
        setMessage(`La recherche "${search}" a donné ${data.total_count} résultats`);
      })
      .catch((error) => {
        setMessage(error.message);
        setNegativeMessage(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const refreshRepositories = () => {
    setNegativeMessage(false);
    searchRepositories([]);
  };

  useEffect(() => {
    console.log("trigger")
    if (page !== 1) {
      searchRepositories(repos);
    }
    else if (search !== '') {
      refreshRepositories();
    }
  }, [search, page]);
  return (
    <Container textAlign="left" className="annuaire">
      <header className="header">
        <img className="header__img" src={logo} alt="Logo Github" />
      </header>
      <SearchBar
        loading={loading}
        onSearchSubmit={(query) => {
          setSearch(query);
          setPage(1);
        }}
      />
      <Message
        negative={negativeMessage}
        message={message}
      />
      <ReposResult repositories={repos} />
      <MoreResultBtn
        visible={!!repos.length}
        loading={loading}
        onMorePage={() => {
          setPage(page + 1);
        }}
      />
    </Container>
  );
};

// == Export
export default Annuaire;
