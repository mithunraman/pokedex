import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DpUtil, FancyId, fetchPokemonDetails} from "../actions/index"

class PokemonListItem extends Component {
    id = null;

    constructor(props) {
        super(props);
        const splitArr = this.props.pokemon.url.split('/');
        this.id = splitArr[splitArr.length - 2];
    }

    componentWillMount() {
        // if (_.isEmpty(this.props.pokemonDetailsMap[this.id]))
        //     this.props.fetchPokemonDetails(this.id);
    }

    componentWillUnmount() {
        //TODO: Find a way to cancel the promise when component is unmounted
    }

    render() {
        const dp = DpUtil(this.id).url;
        return (
            <div className="pokemon-container">
                <div className="text-center">
                    <img src={dp} alt="" className="img-responsive center-block"/>
                </div>
                <div className="pokemon-info">
                    <p className="id">#{FancyId(this.id)}</p>
                    <h5>{_.capitalize(this.props.pokemon.name)}</h5>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pokemonDetailsMap: state.pokemons.pokemonDetailsMap
    }
}

export default connect(mapStateToProps, {fetchPokemonDetails})(PokemonListItem);

