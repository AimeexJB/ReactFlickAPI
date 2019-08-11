import React from 'react';
import axios from 'axios';
import PhotoItem from './photoItem.js';

class Search extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            search: []
        };

    }

    componentDidMount() {
        const {params} = this.props.match;
        axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=678e56d7681b9f2aa7eb9ad67f929eac&text=' + params.queries + '&sort=relevance&privacy_filter=1&safe_search=1&per_page=5&page=1&format=json&nojsoncallback=1')
            .then(response => {
                this.setState(
                    {search: response.data.photos.photo}
                );
  	     })
  	    .catch(error => {
  	        console.log(error);
  	    });
  	}

    render() {
        const recentList = this.state.search.map( p => <PhotoItem key={p.id} id={p.id} owner={p.owner} farm={p.farm} server={p.server} secret={p.secret} title={p.title} ispublic={p.ispublic} isfriend={p.isfriend} isfamily={p.isfamily} />);
        return (
            <div className="container">
                <h1 className="has-text-centered is-uppercase title is-size-4">Search</h1>
                <div className="masonry">
                    {recentList}
                </div>
            </div>
        );
    }
}

export default Search;
