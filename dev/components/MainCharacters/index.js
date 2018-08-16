import React from 'react';
import styles from './maincharacters.css';
import axios from 'axios';
import loading from '../../static/img/loading.gif';

class MainCharacters extends React.Component {
  constructor() {
    super();

    this.state = {
      data: null,
    }
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    axios('https://rickandmortyapi.com/api/character/1,2,3,4,5')
      .then(response => {
        this.setState({
          data: response.data
        })
      })
      .catch(console.error)
  }

  render() {
    const { data } = this.state;
    console.log(this.state)
    return (
      <div className={styles.mainCharacters}>
        <h2 className={styles.mainCharacters__header}>Main Characters</h2>
        <div className={styles.mainCharacters__inner}>
          {
            data ? (
              data.map(item => (
                <div key={item.id} className={styles.mainCharacters__item}>
                  <img src={item.image} alt={item.name} className={styles.mainCharacters__img} />
                  <h3 className={styles.mainCharacters__title}>{item.name}</h3>
                </div>
              ))
            ) : (
                <div className={styles.loading}>
                  <img className={styles.loading__img} src={loading} alt="Loading" />
                  <p className={styles.loading__text}>Wait a sec!</p>
                </div>
              )
          }
        </div>
      </div>
    )
  }
}

export default MainCharacters;
