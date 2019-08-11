import React from 'react';


class PhotoItem extends React.Component {
    constructor(props) {
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

        // console.log(this.props.owner);

    }

    componentDidMount() {
        this.setState(
             {url: `https://farm${this.state.farm}.staticflickr.com/${this.state.server}/${this.state.id}_${this.state.secret}.jpg`}
        );
  	}

    render(){
        return(
            <div className='item'>
                <a href={'https://flickr.com/photos/' + this.props.owner + '/' + this.props.id}>
                    <img alt="" src={this.state.url} />
                </a>
            </div>

        );
    }
}

export default PhotoItem;
