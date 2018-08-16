import React from 'react';
import axios from 'axios';
import Character from '../Character';
import Loader from '../Loader';
import styles from './maincharacters.css';

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
    return (
      <div className={styles.mainCharacters}>
        <h2 className={styles.mainCharacters__header}>Main Characters</h2>
        <div className={styles.mainCharacters__inner}>
          {
            data ? (
              data.map(item => (
                <Character {...item} key={item.id} />
              ))
            ) : (
                <Loader />
              )
          }
        </div>
      </div>
    )
  }
}

export default MainCharacters;
