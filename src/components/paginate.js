import _ from 'lodash';
import React, {Component} from 'react';

class Paginate extends Component {
    currentPage = 0;
    totalPages = 0;

    constructor(props) {
        super(props);
        this.state = {
            paginate: this.props.currentPage
        }
    }

    getLiElements(currentPage, totalPages) {
        let items = [];

        items.push(
            <li className="page-item" key="1">
                <a className="page-link" href="#"
                   onClick={(event) => this.inc(event, -1)}>
                    &lt;&lt;
                </a>
            </li>
        );
        items.push(
            <li className="page-item" key="2">
                <form onSubmit={this.paginateTo.bind(this)}>
                    <input type="number"
                           value={this.state.paginate}
                           onChange={this.onInputChange.bind(this)}
                           className="form-control"/>
                </form>
            </li>
        );
        items.push(
            <li className="page-item" key="3">
                <a className="page-link" href="#"
                   onClick={(event) => this.inc(event, 1)}>
                    &gt;&gt;
                </a>
            </li>
        );
        return items;
    }

    onInputChange(event) {
        this.setState({
            paginate: Number(event.target.value)
        });
    }

    paginateTo(event) {
        event.preventDefault();
        if (this.state.paginate > 0 && this.state.paginate <= this.totalPages) {
            this.props.onPaginate(this.state.paginate);
            this.currentPage = this.state.paginate;
        }
    }

    inc(event, inc) {
        event.preventDefault();
        if (inc === -1) {
            if (this.currentPage === 1)
                return;
            this.props.onPaginate(this.currentPage - 1);
            this.setState({paginate: this.currentPage - 1});
        } else if (inc === 1) {
            if (this.currentPage === this.totalPages)
                return;
            this.props.onPaginate(this.currentPage + 1);
            this.setState({paginate: this.currentPage + 1})
        }
    }

    onPaginate(event, page) {
        event.preventDefault();
        if (page === '<<') {
            if (this.currentPage === 1)
                return;
            this.props.onPaginate(this.currentPage - 1);
        }
        else if (page === '>>') {
            if (this.currentPage === this.totalPages)
                return;
            this.props.onPaginate(this.currentPage + 1);
        }
        if (_.isNumber(page))
            this.props.onPaginate(page);
    }

    render() {
        const currentPage = _.isNumber(this.props.currentPage) ? this.props.currentPage : 1;
        const pageCount = _.isNumber(this.props.pageCount) ? this.props.pageCount : 10;
        this.currentPage = _.round(currentPage);
        this.totalPages = _.round(pageCount);
        const text = `showing ${this.currentPage} of ${this.totalPages}`;
        return (
            <div>
                <ul className="pagination">
                    {this.getLiElements(currentPage, pageCount)}
                </ul>
                <p style={{textAlign: 'center'}}>{text}</p>
            </div>
        );
    }
}

export default Paginate;