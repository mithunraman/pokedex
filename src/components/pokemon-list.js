import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PokemonListItem from './pokemon-list-item'
import Paginate from './paginate';
import PokemonDetail from './pokemon-detail';
import {paginate} from "../actions/index"
import ReactSpinner from 'react-spinjs';


import {ModalContainer, ModalDialog} from 'react-modal-dialog';

class PokemonList extends Component {
    pokemonSelected = null;
    state = {
        isShowingModal: false,
    };

    handleClose = () => this.setState({isShowingModal: false});

    renderPokemons(index) {
        index = index * 9;
        let array = _.slice(this.props.filtered, index, index + 9);
        return array.map((pokemon) => {
            return (
                <div className="col pokecontainer" key={pokemon.name}
                     onClick={() => this.onPokemonDetailsClick(pokemon)}>
                    <PokemonListItem pokemon={pokemon}/>
                </div>
            )
        });
    }

    onPokemonDetailsClick(pokemon) {
        this.pokemonSelected = pokemon;
        this.setState({
            isShowingModal: true
        });
    }

    onPaginate(page) {
        if (page === this.props.current_index)
            return;
        this.props.paginate(page);
    }

    isPokemonDetailsLoading() {
        const splitArr = this.pokemonSelected.url.split('/');
        const id = splitArr[splitArr.length - 2];
        return _.isEmpty(this.props.pokemonDetailsMap[id]);
    }

    render() {
        if (this.props.current_index === 0)
            return <div/>;
        if (this.props.filtered.length === 0)
            return <div>No matching pokemon's found</div>;
        return (
            <div>
                <div>
                    {
                        this.state.isShowingModal &&
                        <ModalContainer onClose={this.handleClose}>
                            {this.isPokemonDetailsLoading() ?
                                <ModalDialog onClose={this.handleClose}>
                                    Loading...
                                </ModalDialog> :
                                <ModalDialog onClose={this.handleClose}>
                                    <PokemonDetail pokemon={this.pokemonSelected}/>
                                </ModalDialog>
                            }
                        </ModalContainer>
                    }
                </div>
                <div className="container-fluid">
                    <div className="row pokemon-row">
                        {this.renderPokemons(this.props.current_index - 1)}
                    </div>
                    <div className="row justify-content-md-center" style={{marginTop: '10px'}}>
                        <div className="col-md-auto">
                            <Paginate currentPage={this.props.current_index}
                                      pageCount={this.props.count / 9}
                                      onPaginate={this.onPaginate.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        current_index: state.pokemons.current_index,
        filtered: state.pokemons.filtered,
        count: state.pokemons.count,
        pokemonDetailsMap: state.pokemons.pokemonDetailsMap
    };
}

export default connect(mapStateToProps, {paginate})(PokemonList)