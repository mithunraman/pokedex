import axios from 'axios';

export const FETCH_POKEMONS = 'FETCH_POKEMONS';
export const PAGINATE = 'PAGINATE';
export const FILTER_POKEMONS = 'FILTER_POKEMONS';
export const FETCH_POKEMON_DETAILS = 'FETCH_POKEMON_DETAILS';

const ROOT_URL = 'https://pokeapi.co/api/v2';
const DOC_URL = 'http://assets.pokemon.com/assets/cms2/img/pokedex/detail';
const DOC_URL2 = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon';

export function fetchPokemons() {
    const request = axios.get(`${ROOT_URL}/pokemon/?limit=1000`);
    return {
        type: FETCH_POKEMONS,
        payload: request
    };
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
    return {url: `${DOC_URL2}/${id}.png`}
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