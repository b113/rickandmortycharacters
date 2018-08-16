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
            error: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
                    // results: true,
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
        });

        this.getData();
    }

    render() {
        const { search, data, results, error } = this.state;
        console.log(data)
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
                                <div className={styles.search__resultsInner}>
                                    {
                                        data.map(item => (
                                            <Character {...item} key={item.id} />
                                        ))
                                    }
                                </div>
                            ) : (
                                error === "Network Error" ? (
                                    <p className={styles.search__error}>Ohh, ohhh geez!! Try again!</p>
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
