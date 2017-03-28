import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppMuiTheme from './components/theme/appMuiTheme';
import Navigation from './components/navigation/navigation';
import { StickyContainer } from 'react-sticky';

import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import './index.css';

import Journal from './pages/journal/journal';
import Analytics from './pages/analytics/analytics';
import Dashboard from './pages/dashboard/dashboard';
import Error from './pages/error/error';
import PageNotFound from './pages/pageNotFound/pageNotFound';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <MuiThemeProvider muiTheme={ AppMuiTheme } >
                    <div>
                        <StickyContainer>
                            <Navigation />
                            <Switch>
                                <Route exact path="/" component={ Dashboard } />
                                <Route path="/journal" component={ Journal } />
                                <Route path="/analytics" component={ Analytics } />
                                <Route path="/error" component={ Error } />
                                <Route component={ PageNotFound } />
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