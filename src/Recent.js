import React from 'react';
import axios from 'axios';
import PhotoItem from './photoItem.js';

import BottomScrollListener from 'react-bottom-scroll-listener';

class Recent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            recent: [],

            photosOrdered:[],
            sort: 'latest',
            page: 1,
            loading: false,
            columns: 3,
            maxCards: 30
        };

        this.handleClick = this.handleClick.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    apiCall() {
        axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=678e56d7681b9f2aa7eb9ad67f929eac&per_page=30&page=' + this.state.page + '&order_by=' + this.state.sort + '&format=json&nojsoncallback=1')
            .then(response => {
                this.setState({
                    // {recent: response.data.photos.photo}
                    recent: [...this.state.recent, ...response.data.photos.photo]
                });

                this.reorder(this.state.recent.slice(0,this.state.maxCards*this.state.page), this.state.columns);
                this.setState({ loading: false });

  	         })
  	    .catch(error => {
  	         console.log(error);
  	    });
  	}

    componentDidMount() {
        this.apiCall();
  	}

    handleClick(sortMode) {

        this.setState({
            sort: sortMode
        }, () => {
            this.setState({recent: []});
            this.apiCall();
        });
    }

    loadMore() {
        this.setState(prevState => ({
          page: prevState.page + 1,
          loading: true
        }));

        this.apiCall();
    }

    reorder = (arr, columns) => {

        const cols = columns;
        const out = [];
        let col = 0;
        while(col < cols) {
            for(let i = 0; i < arr.length; i += cols) {
                let _val = arr[i + col];
                if (_val !== undefined)
                    out.push(_val);
            }
            col++;
        }
        this.setState({ photosOrdered: out });
    }

    render() {
        const recentList = this.state.photosOrdered.map( p => <PhotoItem key={p.id} id={p.id} owner={p.owner} farm={p.farm} server={p.server} secret={p.secret} title={p.title}/>);

        return (
            <div className="uk-container">
                <h3 className="uk-text-uppercase uk-text-center">Recent Photos</h3>
                <div className="masonry">
                    {recentList}
                </div>

                <BottomScrollListener onBottom={this.loadMore} />

            </div>
        );
    }
}

export default Recent;
