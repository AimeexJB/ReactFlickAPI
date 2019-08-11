import React from 'react';
import axios from 'axios';
import PhotoItem from './photoItem.js';

import BottomScrollListener from 'react-bottom-scroll-listener';

class Search extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            search: [],
            page: 1,
            loading: false
        };

        this.loadMore = this.loadMore.bind(this);

    }

    loadQuery( query ) {
        axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=678e56d7681b9f2aa7eb9ad67f929eac&text=' + query + '&sort=relevance&privacy_filter=1&safe_search=1&per_page=30&page=' + this.state.page + '&accuracy=16&format=json&nojsoncallback=1')
            .then(response => {
                this.setState({
                    search: [...this.state.search, ...response.data.photos.photo]
                });
                this.setState({ loading: false });
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        const { params } = this.props.match;
        this.loadQuery(params.query);

  	}

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.query !== this.props.match.params.query) {
            this.setState({search: []});
            const query = nextProps.match.params.query;
            this.loadQuery(query);
        }
    }

    loadMore() {
        this.setState(prevState => ({
          page: prevState.page + 1,
          loading: true
        }));

        const { params } = this.props.match;
        this.loadQuery(params.query);
    }

    render() {
        const recentList = this.state.search.map( p => <PhotoItem key={p.id} id={p.id} owner={p.owner} farm={p.farm} server={p.server} secret={p.secret} title={p.title} ispublic={p.ispublic} isfriend={p.isfriend} isfamily={p.isfamily} />);
        return (
            <div className="container">
                <h3 className="uk-text-uppercase uk-text-center">Search Results...</h3>
                <div className="masonry">
                    {recentList}
                </div>

                <BottomScrollListener onBottom={this.loadMore} />

            </div>
        );
    }
}

export default Search;
