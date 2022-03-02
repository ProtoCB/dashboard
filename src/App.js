import React, { Component } from 'react';

import Wrapper from "./containers/Wrapper/Wrapper";
import { BrowserRouter, Route } from 'react-router-dom';
import { CookiesProvider, withCookies } from 'react-cookie';

class App extends Component {

    render(){
        return(
                <BrowserRouter>
                    <Wrapper cookies={this.props.cookies}/>
                </BrowserRouter>
        );
    }
}


export default withCookies(App);
