import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import PoolIcon from 'material-ui/svg-icons/places/pool';
import Sticky from 'react-sticky';

import AppColors from '../theme/appColors';

class NavigationBar extends Component {
    constructor() {
        super();

        this.state = {
            openPopover: false,
        };

        this.styles = {
            menuIcon: {
                marginLeft: 10,
                marginRight: 10
            }
        };

        this.onMenuIconClick = this.onMenuIconClick.bind(this);
        this.onPopoverClose = this.onPopoverClose.bind(this);
    }

    onMenuIconClick() {
        this.props.onMenuIconClick();
    }

    onIconButtonClick = (event) => {
        event.preventDefault();
        this.setState({ openPopover: true, anchorEl: event.currentTarget });
    }

    onPopoverClose() {
        this.setState({ openPopover: false });
    }

    render() {
        return (
            <Sticky>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <IconButton disableTouchRipple={ true } onTouchTap={ this.onMenuIconClick } style={ this.styles.menuIcon }>
                            <MenuIcon color={ AppColors.light3 } />
                        </IconButton>
                        <ToolbarTitle text="Stock Trading Journal" />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <PoolIcon color={ AppColors.light3 } />
                        <ToolbarSeparator />
                        <IconButton disableTouchRipple={ true } onTouchTap={ this.onIconButtonClick }>
                            <NavigationExpandMoreIcon color={ AppColors.light3 } />
                        </IconButton>
                        <Popover
                            open={ this.state.openPopover }
                            anchorEl={this.state.anchorEl}
                            onRequestClose={ this.onPopoverClose }
                            animation={ PopoverAnimationVertical }
                            >
                            <Menu>
                                <MenuItem primaryText="Refresh" />
                                <MenuItem primaryText="Help &amp; feedback" />
                                <MenuItem primaryText="Settings" />
                                <MenuItem primaryText="Sign out" />
                            </Menu>
                            </Popover>
                    </ToolbarGroup>
                </Toolbar>
            </Sticky>
        );
    }
}

export default NavigationBar;