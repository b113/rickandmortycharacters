import React from 'react';
import PropTypes from 'prop-types';
import styles from './character.css';

const Character = ({ id, image, name }) => (
    <div key={id} className={styles.character}>
        <img src={image} alt={name} className={styles.character__img} />
        <h3 className={styles.character__title}>{name}</h3>
    </div>
)

Character.propTypes = {
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default Character;

