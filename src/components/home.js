import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchBar from "./search-bar";
import PokemonList from "./pokemon-list";
import {fetchPokemons} from "../actions/index";

class Home extends Component {
    componentWillMount() {
        this.props.fetchPokemons();
    }

    render() {
        /*
        * TODO: if state.all is empty show an universal loader
        * */
        return (
            <div>
                <div className="container-fluid">
                    <div className="row justify-content-md-center">
                        <img
                            src="https://cdn.bulbagarden.net/upload/thumb/4/4b/Pok%C3%A9dex_logo.png/250px-Pok%C3%A9dex_logo.png"
                            alt=""/></div>
                </div>
                <SearchBar/>
                <PokemonList/>
            </div>
        );
    }
}

export default connect(null, {fetchPokemons})(Home)