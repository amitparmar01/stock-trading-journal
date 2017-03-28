import React, { Component } from 'react';
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
                <MenuItem onTouchTap={ () => { this.onMenuItemClick("/") } } style={ this.styles.drawer }>Home</MenuItem>
                <MenuItem onTouchTap={ () => { this.onMenuItemClick("/journal") } } style={ this.styles.drawer }>Journal</MenuItem>
                <MenuItem onTouchTap={ () => { this.onMenuItemClick("/analytics") } } style={ this.styles.drawer }>Analytics</MenuItem>
                <Logo size={ 55 } style={ this.styles.logo } />
            </Drawer>
        );
    }
}

NavigationDrawer.contextTypes = {
    router: React.PropTypes.object
};

export default NavigationDrawer;