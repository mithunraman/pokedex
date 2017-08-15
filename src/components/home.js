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
                <SearchBar/>
                <PokemonList/>
            </div>
        );
    }
}

export default connect(null, {fetchPokemons})(Home)