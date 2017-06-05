import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import AppColors from '../theme/appColors';

import Logo from '../logo/logo';

class NavigationDrawer extends Component {
    constructor() {
        super();

        this.styles = {
            logo: {
                position: "absolute",
                bottom: 20,
                left: 20
            },
            drawer: {
                color: AppColors.light3
            },
            menuTopSpace: {
                height: 50,
                backgroundColor: AppColors.bright1
            }
        };

        this.onRequestChange = this.onRequestChange.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
    }

    onRequestChange() {
        this.props.onRequestClose();
    }

    onMenuItemClick(route) {
        this.context.router.history.push(route);
        this.props.onRequestClose();
    }

    render() {
        return (
            <Drawer docked={ false } width={ 300 } open={ this.props.open } onRequestChange={ this.onRequestChange } >
                <div style={ this.styles.menuTopSpace } />
                <MenuItem onTouchTap={ () => { this.onMenuItemClick("/dashboard") } } style={ this.styles.drawer }>Dashboard</MenuItem>
                <MenuItem onTouchTap={ () => { this.onMenuItemClick("/trades") } } style={ this.styles.drawer }>Trades</MenuItem>
                <MenuItem onTouchTap={ () => { this.onMenuItemClick("/analysis") } } style={ this.styles.drawer }>Analysis</MenuItem>
                <MenuItem onTouchTap={ () => { this.onMenuItemClick("/analytics") } } style={ this.styles.drawer }>Analytics</MenuItem>
                <Logo size={ 55 } style={ this.styles.logo } />
            </Drawer>
        );
    }
}

NavigationDrawer.contextTypes = {
    router: PropTypes.object.isRequired
};

export default NavigationDrawer;