import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppMuiTheme from './components/theme/appMuiTheme';
import Navigation from './components/navigation/navigation';
import { StickyContainer } from 'react-sticky';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import './index.css';

import LoginStore from './shared/stores/loginStore';
import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Trades from './pages/trades/trades';
import Analysis from './pages/analysis/analysis';
import Error from './pages/error/error';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import PageNotFound from './pages/pageNotFound/pageNotFound';

class App extends Component {
    checkAuthentication(component) {
        if (!LoginStore.isUserAuthenticated()) {
            return <Redirect to="/login" />;
        }
        else {
            return component;
        }
    }

    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider muiTheme={ AppMuiTheme } >
                    <div>
                        <StickyContainer>
                            <Navigation />
                            <Switch>
                                <Route exact path="/" component={ Home } />
                                <Route path="/dashboard" render={ () => this.checkAuthentication(<Dashboard />) } />
                                <Route path="/trades" render={ () => this.checkAuthentication(<Trades />) } />
                                <Route path="/analysis" render={ () => this.checkAuthentication(<Analysis />) } />
                                <Route path="/login" component={ Login } />
                                <Route path="/signup" component={ Signup } />
                                <Route path="/error" render={ () => this.checkAuthentication(<Error />) } />
                                <Route render={ () => this.checkAuthentication(<PageNotFound />) } />
                            </Switch>
                            <div style={ { height: 500 } }/>
                        </StickyContainer>
                    </div>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'))