import React, {Component} from 'react';
import {PokemonList} from "./pokemon-list"
import Home from './home';
import '../style/app.css';

export default class App extends Component {
    render() {
        return (
            <div>
                <Home/>
            </div>
        );
    }
}
