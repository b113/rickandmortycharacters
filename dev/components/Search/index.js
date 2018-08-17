import React from 'react';
import axios from 'axios';
import Character from '../Character';
import MainCharacter from '../MainCharacters';
import Loader from '../Loader';
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
    }

    handleChange(e) {
        this.setState({
            search: e.target.value,
        });
    }

    getData() {
        const { search } = this.state;
        axios(`https://rickandmortyapi.com/api/character/?name=${search}`)
            .then((response) => {
                this.setState({
                    data: response.data.results,
                    nextPage: response.data.info.next,
                    pages: response.data.info.pages,
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                })
            })
    }

    getMoreData(data) {

        axios(`${data}`)
            .then((response) => {
                this.setState({
                    data: this.state.data.concat(response.data.results),
                    pages: this.state.pages - 1,
                    nextPage: response.data.info.next,
                })
            })
            .catch(error => {
                this.setState({
                    error: error.message,
                })
            })

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

    render() {
        const { search, data, results, error, amount, nextPage, pages } = this.state;
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
                    <button className={styles.search__btn}>Search</button>
                </form>
                <div className={styles.search__results}>
                    {
                        results ? (

                            data ? (
                                <div className={styles.search__wrapper}>
                                    <div className={styles.search__resultsInner}>
                                        {
                                            data.map((item, i) => {
                                                if (i < amount) {
                                                    return <Character {...item} key={item.id} />
                                                }
                                                return null;
                                            })
                                        }
                                    </div>
                                    {
                                        amount < data.length ? (
                                            <button
                                                type="button"
                                                className={styles.search__btnMore}
                                                onClick={() => this.clickHandler(5)}
                                            >
                                                Show me more
                                        </button>
                                        ) : (pages > 1) ? (
                                            this.getMoreData(nextPage)
                                        ) : (
                                                    <p className={styles.search__notification}>
                                                        Ohh, man! That's all that we have here!
                                                    </p>
                                                )
                                    }
                                </div>

                            ) : (
                                    error === "Network Error" ? (
                                        <p className={styles.search__error}>Ohh, ohhh geez!! Try something else!</p>
                                    ) : (
                                            <Loader />
                                        )


                                )
                        ) : (
                                <MainCharacter />
                            )
                    }
                </div>
            </div>
        )
    }
}

export default Search;
