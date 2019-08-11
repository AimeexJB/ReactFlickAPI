import React from 'react';
import {withRouter} from 'react-router-dom';

class SearchBar extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            queries: ''
        };

    }

    saveQuery( event ) {
        this.setState({
            queries: event.target.value
        });
    }

    handleKeyPress(event) {
        if (event.key === 'Enter') {
            this.props.history.push('/search/' + this.state.queries);
        }
    }

    render() {

        return (

            <div className="uk-margin uk-navbar-item">
                <form className="uk-search uk-search-default uk-search-navbar">
                    <span className="uk-search-icon-flip" uk-search-icon="true"></span>
                    <input
                        className="uk-search-input uk-form-width-large"
                        type="text"
                        value={this.state.queries}
                        onChange={this.saveQuery.bind(this)}
                        onKeyPress={this.handleKeyPress.bind(this)}
                        placeholder="Search..."
                    />
                </form>
            </div>


        );

    }


}

export default withRouter(SearchBar);
