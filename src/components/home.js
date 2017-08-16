import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchBar from "./search-bar";
import PokemonList from "./pokemon-list";
import {fetchPokemons, updatePokemonsType} from "../actions/index";
import {types} from "../actions/index"

class Home extends Component {
    componentWillMount() {
        this.props.fetchPokemons();
    }

    updateType(type) {
        if (!_.isEmpty(this.props[type.name])) {
            this.props.updatePokemonsType(type.name);
        } else {
            this.props.fetchPokemons(type.value)
        }
    }

    render() {
        /*
        * TODO: if state.all is empty show an universal loader
        * */
        const self = this;
        const filterElements = types.map(function (type) {
            if (type.name === self.props.type)
                return <div className="pokemon-type-container"
                            key={type.name}><p><b>{type.name}</b></p></div>;
            return (
                <div className="pokemon-type-container" onClick={() => self.updateType(type)}
                     key={type.name}>
                    {type.name === self.props.type ? <p><b>{type.name}</b></p> : <p>{type.name}</p>}
                </div>
            );
        });
        return (
            <div>
                <div className="container-fluid">
                    <div className="row justify-content-md-center">
                        <img
                            src="https://cdn.bulbagarden.net/upload/thumb/4/4b/Pok%C3%A9dex_logo.png/250px-Pok%C3%A9dex_logo.png"
                            alt=""/></div>
                </div>

                <SearchBar/>

                <div className="container-fluid" style={{margin: '10px'}}>
                    <div className="row justify-content-md-center">
                        <div className="col-md-6">
                            <div>{filterElements}</div>
                        </div>
                    </div>
                </div>

                <PokemonList/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.pokemons
    }
}

export default connect(mapStateToProps, {fetchPokemons, updatePokemonsType})(Home)