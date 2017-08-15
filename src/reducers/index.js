import {combineReducers} from 'redux';
import PokemonReducer from './reducer-pokemon';

const rootReducer = combineReducers({
    pokemons: PokemonReducer
});

export default rootReducer;
