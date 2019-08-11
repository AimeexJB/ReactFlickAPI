
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter, Switch } from 'react-router-dom';
import './style.css';

import Recent from './Recent';
import Photo from './photo';

import Search from './search';
import SearchBar from './searchbar';

class Routing extends React.Component{
    constructor(props){
        super(props);

        console.log("Hello");
    }

    render(){
        return(
            <BrowserRouter>
                <div>
                    <div className="uk-container">

                        <nav className="uk-navbar-container" uk-navbar="true">
                            <div className="uk-navbar-left">
                                <Link to="/"><h1>Formedix Test</h1></Link>

                            </div>
                            <div className="uk-navbar-right">
                                <SearchBar />
                            </div>
                        </nav>


                        <Switch>
                            <Route exact path="/" component={Recent} />
                            <Route path="/photos/:id" component={Photo} />
                            <Route path="/search/:q" component={Search} />
                        </Switch>

                    </div>

                </div>
            </BrowserRouter>
        );
    }
}


ReactDOM.render(
    <Routing />,
    document.getElementById('root')
);
