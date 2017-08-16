import {
    FETCH_POKEMON_DETAILS,
    FETCH_POKEMONS,
    FETCH_POKEMONS_TYPE,
    FILTER_POKEMONS,
    PAGINATE,
    UPDATE_POKEMONS_TYPE
} from "../actions/index"

const INITIAL_STATE = {
    filtered: [],
    all: [],
    pokemonDetailsMap: {},
    count: 0,
    current_index: 0,
    current_pokemon: null,
    type: 'all'
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
        case FETCH_POKEMONS_TYPE:
            let fptCopy = {...state};
            fptCopy[action.payload.data.name] = action.payload.data.pokemon.map(function (pokemon) {
                return pokemon.pokemon;
            });
            fptCopy['filtered'] = fptCopy[action.payload.data.name];
            fptCopy['count'] = fptCopy[action.payload.data.name].length;
            fptCopy['current_index'] = 1;
            fptCopy['type'] = action.payload.data.name;
            return fptCopy;
        case UPDATE_POKEMONS_TYPE:
            return {
                ...state,
                'type': action.payload,
                'filtered': state[action.payload],
                'count': state[action.payload].length,
                'current_index': 1,
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
                    filtered: state[state.type],
                    count: (state[state.type]).length,
                    current_index: 1
                }
            }
            const results = [];
            (state[state.type]).every(function (pokemon) {
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