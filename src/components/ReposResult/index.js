/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Segment } from 'semantic-ui-react';
import Repository from './Repository';

import './reposResult.scss';

const ReposResult = ({ repositories }) => {
  if (repositories.length === 0) {
    return (
      <Segment>Aucun repository à afficher</Segment>
    );
  }

  return (
    <Card.Group
      itemsPerRow={5}
      stackable
      doubling
      className="reposResults"
    >
      {repositories.map((repository) => (
        <Repository {...repository} key={repository.id.toString()}/>
      ))}
    </Card.Group>
);
};

ReposResult.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      owner: PropTypes.shape({
        id: PropTypes.number.isRequired,
        login: PropTypes.string.isRequired,
        avatar_url: PropTypes.string.isRequired,
      }),
      description: PropTypes.string,
    }),
  ),
};

ReposResult.defaultProps = {
  repositories: [],
};
export default ReposResult;
