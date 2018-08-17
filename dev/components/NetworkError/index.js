import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import styles from './networkerror.css';

const NetworkError = ({ error }) => {
  if (error === 'Network Error') {
    return <p className={styles.networkError}>Ohh, ohhh geez!! Try something else!</p>;
  }
  return <Loader />;
};

NetworkError.propTypes = {
  error: PropTypes.string.isRequired,
};

export default NetworkError;
