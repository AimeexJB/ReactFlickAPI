import React from 'react';
import axios from 'axios';
import PhotoItem from './photoItem.js';

class Recent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            recent: []
        };
    }

    componentDidMount() {
        axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=678e56d7681b9f2aa7eb9ad67f929eac&format=json&nojsoncallback=1')
            .then(response => {
                this.setState(
                    // console.log(response)

                    {recent: response.data.photos.photo}
                );
  	         })
  	    .catch(error => {
  	         console.log(error);
  	    });
  	}

    render() {
        const recentList = this.state.recent.map( p => <PhotoItem key={p.id} id={p.id} owner={p.owner} farm={p.farm} server={p.server} secret={p.secret} title={p.title}/>);

        return (
            <div className="uk-container">
                <h3 className="uk-text-uppercase uk-text-center">Recent Photos</h3>
                <div className="masonry">
                    {recentList}
                </div>
            </div>
        );
    }
}

export default Recent;
