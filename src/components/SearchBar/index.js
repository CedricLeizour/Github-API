/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Segment, Form, Input } from 'semantic-ui-react';

const SearchBar = ({ onSearchSubmit, loading }) => {
  const [search, setSearch] = useState('');

  const handleOnSubmit = (event) => {
    event.preventDefault();
    onSearchSubmit(search);
  };

  return (
    <Segment>
      <Form onSubmit={handleOnSubmit}>
        <Form.Field>
          <Input
            loading={loading}
            icon="search"
            iconPosition="left"
            placeholder="Recherche ..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </Form.Field>
      </Form>
    </Segment>
  );
};

SearchBar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

SearchBar.defaultProps = {
  loading: false,
}

export default SearchBar;
