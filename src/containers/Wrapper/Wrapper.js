import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter } from "react-router";
import Header from "../../components/Header/Header";
import Login from "../../components/Login";
import { withCookies } from 'react-cookie';

import LandingPage from "../LandingPage/LandingPage";

class Wrapper extends Component {
    render () {

        return (
            <div>
                <header>
                    <Header/>
                </header>
                <Route path='/dashboard' exact render={ () => <LandingPage />}/>
                <Route path='/' exact render={ () => <Login />} />
            </div>
        );
    }
}

export default withCookies(withRouter(Wrapper));