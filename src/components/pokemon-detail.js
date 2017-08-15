import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DpUtil, fetchPokemonDetails} from "../actions/index"

class PokemonDetail extends Component {
    id = null;

    constructor(props) {
        super(props);
        const splitArr = this.props.pokemon.url.split('/');
        this.id = splitArr[splitArr.length - 2];
    }

    componentWillMount() {
        if (_.isEmpty(this.props.pokemonDetailsMap[this.id])) {
            this.props.fetchPokemonDetails(this.id);
        }
    }

    render() {
        if (_.isEmpty(this.props.pokemonDetailsMap[this.id]))
            return <div>Loading...</div>
        const details = this.props.pokemonDetailsMap[this.id];
        const dp = DpUtil(this.id).url;

        let types = '';
        this.props.pokemonDetailsMap[this.id].types.forEach(function (type) {
            types += _.capitalize(type.type.name) + ', ';
        });
        types = types.substr(0, types.length - 2);

        let moves = '';
        this.props.pokemonDetailsMap[this.id].moves.forEach(function (move) {
            moves += _.capitalize(move.move.name) + ', ';
        });
        moves = moves.substr(0, moves.length - 2);

        let stats = [];
        this.props.pokemonDetailsMap[this.id].stats.forEach(function (stat) {
            stats.push(
                <div key={stat.stat.name}>
                    <b>{_.capitalize(stat.stat.name)}</b>: {stat.base_stat}
                </div>
            );
        });

        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                            <h4>{_.capitalize(details.name)}</h4>
                            <p>{types}</p>
                        </div>
                    </div>
                    <hr style={{margin: '0px'}}/>
                    <br/>
                    <div className="card bg-light mb-3" style={{maxWidth: '60rem'}}>
                        <div className="card-header">Moves</div>
                        <div className="card-body">
                            {moves}
                        </div>
                    </div>
                    <div className="card bg-light mb-3" style={{maxWidth: '60rem'}}>
                        <div className="card-header">Stats</div>
                        <div className="card-body">
                            {stats}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        pokemonDetailsMap: state.pokemons.pokemonDetailsMap
    };
}

export default connect(mapStateToProps, {fetchPokemonDetails})(PokemonDetail);