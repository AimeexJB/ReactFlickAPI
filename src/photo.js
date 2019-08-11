import React from 'react';
import axios from 'axios';

class Photo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            imageurl: '',
            farm: props.farm,
            server: props.server,
            secret: props.secret,
            id: props.id,
            owner: props.owner,
            url: ''
        };
    }


    componentDidMount() {
        const {params} = this.props.match;
        axios.get('https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=678e56d7681b9f2aa7eb9ad67f929eac&photo_id=' + params.id + 'format=json&nojsoncallback=1')
            .then(response => {
                this.setState(
                    {url: `https://www.flickr.com/photos/${this.state.owner}/${this.state.id}`}
                );
  	     })
  	    .catch(error => {
  	        console.log(error);
  	    });
  	}

    render() {

        return (

            <div>
                <img alt="" width="100%" src={this.state.url} />
            </div>

        );
    }
}

export default Photo;
