import React, { Component } from 'react';
import NavigationBar from './navigationBar';
import NavigationDrawer from './navigationDrawer';

class Navigation extends Component {
    constructor() {
        super();

        this.state = {
            drawerOpened: false
        };

        this.openDrawer = this.openDrawer.bind(this);
        this.closeDrawer = this.closeDrawer.bind(this);
    }

    openDrawer() {
        this.setState({ drawerOpened: true });
    }

    closeDrawer() {
        this.setState({ drawerOpened: false });
    }

    onMenuCLick(route) {
        this.context.router.transitionTo(route);
        this.setState({ drawerOpened: false });
    }

    render() {
        return (
            <div>
                <NavigationBar onMenuIconClick={ this.openDrawer } />
                <NavigationDrawer open={ this.state.drawerOpened } onRequestClose={ this.closeDrawer } />
            </div>
        );
    }
}

export default Navigation;