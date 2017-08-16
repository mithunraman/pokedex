import _ from 'lodash';
import axios from 'axios';

export const FETCH_POKEMONS = 'FETCH_POKEMONS';
export const FETCH_POKEMONS_TYPE = 'FETCH_POKEMONS_TYPE';
export const PAGINATE = 'PAGINATE';
export const FILTER_POKEMONS = 'FILTER_POKEMONS';
export const FETCH_POKEMON_DETAILS = 'FETCH_POKEMON_DETAILS';
export const UPDATE_POKEMONS_TYPE = 'UPDATE_POKEMONS_TYPE';
export const CANCEL_REQUEST = 'CANCEL_REQUEST';

export const types = [
    {name: 'all', value: 0},
    {name: 'normal', value: 1},
    {name: 'fighting', value: 2},
    {name: 'flying', value: 3},
    {name: 'poison', value: 4},
    {name: 'ground', value: 5},
    {name: 'rock', value: 6},
    {name: 'bug', value: 7},
    {name: 'ghost', value: 8},
    {name: 'steel', value: 9},
    {name: 'fire', value: 10},
    {name: 'water', value: 11},
    {name: 'grass', value: 12},
    {name: 'electric', value: 13},
    {name: 'psychic', value: 14},
    {name: 'ice', value: 15},
    {name: 'dragon', value: 16},
    {name: 'dark', value: 17},
    {name: 'fairy', value: 18},
];

const ROOT_URL = 'https://pokeapi.co/api/v2';
const DOC_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export function fetchPokemons(type) {
    if (!_.isNumber(type) || type === 0) {
        const request = axios.get(`${ROOT_URL}/pokemon/?limit=1000`);
        return {
            type: FETCH_POKEMONS,
            payload: request
        };
    } else {
        const request = axios.get(`${ROOT_URL}/type/${type}`);
        return {
            type: FETCH_POKEMONS_TYPE,
            payload: request
        };
    }
}

export function updatePokemonsType(type) {
    return {
        type: UPDATE_POKEMONS_TYPE,
        payload: type
    }
}

export function paginate(page) {
    return {
        type: PAGINATE,
        payload: page
    };
}

export function filterPokemons(text) {
    return {
        type: FILTER_POKEMONS,
        payload: text.toLowerCase()
    }
}

export function fetchPokemonDetails(id) {
    const request = axios.get(`${ROOT_URL}/pokemon/${id}`);
    return {
        type: FETCH_POKEMON_DETAILS,
        payload: request
    }
}

export function DpUtil(id) {
    return {url: `${DOC_URL}/${id}.png`}
}

export function FancyId(id) {
    if (id < 702) {
        if (id < 10)
            id = '00' + id;
        else if (id < 100)
            id = '0' + id;
    }
    return id;
}