/* eslint-disable arrow-body-style */
import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Repository = ({
  name,
  owner: {
    login,
    avatar_url: avatarUrl,
  },
  description,
 }) => {
  return (
    <Card>
      <Image src={avatarUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header textAlign="left">{name}</Card.Header>
        <Card.Meta>
          <span className="date">{login}</span>
        </Card.Meta>
        <Card.Description>
          {description || 'Aucune Description'}
        </Card.Description>
      </Card.Content>
    </Card>
  );
};

Repository.propTypes = {
  name: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    login: PropTypes.string.isRequired,
    avatar_url: PropTypes.string.isRequired,
  }),
  description: PropTypes.string,
};

Repository.defaultProps = {
  owner: {},
};

export default Repository;
