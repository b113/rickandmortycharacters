import React from 'react';
import axios from 'axios';
import Character from '../Character';
import MainCharacter from '../MainCharacters';
import NetworkError from '../NetworkError';
import styles from './search.css';
import logo from '../../static/img/logo.png';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      data: null,
      results: false,
      nextPage: '',
      error: '',
      amount: 5,
      pages: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    // this.networkError = this.networkError.bind(this);
    this.showMore = this.showMore.bind(this);
    this.charactersList = this.charactersList.bind(this);
  }

  getData() {
    const { search } = this.state;
    axios(`https://rickandmortyapi.com/api/character/?name=${search}`)
      .then((response) => {
        this.setState({
          data: response.data.results,
          nextPage: response.data.info.next,
          pages: response.data.info.pages,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  getMoreData(link) {
    const { data, pages } = this.state;
    axios(`${link}`)
      .then((response) => {
        this.setState({
          data: data.concat(response.data.results),
          pages: pages - 1,
          nextPage: response.data.info.next,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  }

  handleChange(e) {
    this.setState({
      search: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      results: true,
      data: null,
      search: '',
    });

    this.getData();
  }

  clickHandler(val) {
    const { amount } = this.state;
    this.setState({
      amount: amount + val,
    });
  }

  showMore(amount, data, pages, nextPage) {
    if (amount < data.length) {
      return (
        <button
          type="button"
          className={styles.search__btnMore}
          onClick={() => this.clickHandler(5)}
        >
          Show me more
        </button>
      );
    }
    if (pages > 1) {
      return this.getMoreData(nextPage);
    }

    return (
      <p className={styles.search__notification}>
          Ohh, man! That&apos;s all that we have here!
      </p>
    );
  }

  charactersList(data) {
    const {
      error, amount, nextPage, pages,
    } = this.state;
    if (data) {
      return (
        <div className={styles.search__wrapper}>
          <div className={styles.search__resultsInner}>
            {
              data.map((item, i) => {
                if (i < amount) {
                  return <Character {...item} key={item.id} />;
                }
                return null;
              })
            }
          </div>
          {
            this.showMore(amount, data, pages, nextPage)
          }
        </div>
      );
    }
    return <NetworkError error={error} />;
  }

  render() {
    const {
      search, data, results,
    } = this.state;
    return (
      <div className={styles.search}>
        <img src={logo} alt="Rick and Morty" className={styles.search__logo} />
        <form onSubmit={this.handleSubmit} className={styles.search__form}>
          <input
            type="search"
            onChange={this.handleChange}
            value={search}
            className={styles.search__formInput}
          />
          <button type="submit" className={styles.search__btn}>Search</button>
        </form>
        <div className={styles.search__results}>
          {
            results ? (
              this.charactersList(data)
            ) : (
              <MainCharacter />
            )
          }
        </div>
      </div>
    );
  }
}

export default Search;
