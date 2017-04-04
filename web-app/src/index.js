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

import AppStore from './shared/appStore';
import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Trades from './pages/trades/trades';
import Analysis from './pages/analysis/analysis';
import Analytics from './pages/analytics/analytics';
import Login from './pages/account/login/login';
import Signup from './pages/account/signup/signup';
import ResetPassword from './pages/account/resetPassword/resetPassword';
import Terms from './pages/terms/terms';
import InternalServerError from './pages/errors/internalServerError/internalServerError';
import PageNotFound from './pages/errors/pageNotFound/pageNotFound';

class App extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            openPopover: false
        };

        this.styles = {
            main: {
                padding: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }
        };
    }

    checkAuthentication(component) {
        if (!AppStore.isUserAuthenticated()) {
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
                            <div style={ this.styles.main }>
                                <Switch>
                                    <Route exact path="/" component={ Home } />
                                    <Route path="/dashboard" render={ () => this.checkAuthentication(<Dashboard />) } />
                                    <Route path="/trades" render={ () => this.checkAuthentication(<Trades />) } />
                                    <Route path="/analysis" render={ () => this.checkAuthentication(<Analysis />) } />
                                    <Route path="/analytics" render={ () => this.checkAuthentication(<Analytics />) } />
                                    <Route path="/login" component={ Login } />
                                    <Route path="/signup" component={ Signup } />
                                    <Route path="/reset-password" component={ ResetPassword } />
                                    <Route path="/terms" component={ Terms } />
                                    <Route path="/500" render={ () => this.checkAuthentication(<InternalServerError />) } />
                                    <Route render={ () => this.checkAuthentication(<PageNotFound />) } />
                                </Switch>
                            </div>
                        </StickyContainer>
                    </div>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'))