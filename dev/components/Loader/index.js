import React from 'react';
import styles from './loader.css';
import loading from '../../static/img/loading.gif';

const Loader = () => (
    <div className={styles.loader}>
        <img className={styles.loader__img} src={loading} alt="Loading" />
        <p className={styles.loader__text}>Wait a sec!</p>
    </div>
)

export default Loader;
