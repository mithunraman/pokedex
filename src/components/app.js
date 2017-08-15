import React, {Component} from 'react';
import {PokemonList} from "./pokemon-list"
import '../style/app.css';

export default class App extends Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}
