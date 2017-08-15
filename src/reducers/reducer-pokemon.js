import {FETCH_POKEMONS, PAGINATE, FILTER_POKEMONS, FETCH_POKEMON_DETAILS} from "../actions/index"

const INITIAL_STATE = {
    filtered: [],
    all: [],
    pokemonDetailsMap: {},
    count: 0,
    current_index: 0,
    current_pokemon: null
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_POKEMONS:
            return {
                ...state,
                all: action.payload.data.results,
                filtered: action.payload.data.results,
                count: action.payload.data.count,
                current_index: 1
            };
        case PAGINATE:
            return {
                ...state,
                current_index: action.payload
            };
        case FILTER_POKEMONS:
            if (action.payload.length === 0) {
                return {
                    ...state,
                    filtered: state.all,
                    count: state.all.length,
                    current_index: 1
                }
            }
            const results = [];
            state.all.every(function (pokemon) {
                if (pokemon.name.indexOf(action.payload) !== -1)
                    results.push(pokemon);
                return true;
            });
            return {
                ...state,
                filtered: results,
                count: results.length,
                current_index: 1
            };
        case FETCH_POKEMON_DETAILS:
            const copy = {
                ...state.pokemonDetailsMap,
            };
            copy[action.payload.data.id] = action.payload.data;
            return {
                ...state,
                pokemonDetailsMap: copy
            };
    }
    return state;
}