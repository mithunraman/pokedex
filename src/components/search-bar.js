import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {filterPokemons} from "../actions/index"

class SearchBar extends Component {
    delayedSearch = _.debounce((term) => {
        this.props.filterPokemons(term);
    }, 500);

    onInputChange(event) {
        this.delayedSearch(event.target.value);
    }

    onFormSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <form onSubmit={this.onFormSubmit.bind(this)}
                              className="input-group search-bar">
                            <input placeholder="Search by pokemon"
                                   className="form-control"
                                   onChange={this.onInputChange.bind(this)}/>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(null, {filterPokemons})(SearchBar);