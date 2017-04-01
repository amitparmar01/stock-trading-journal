import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Divider from 'material-ui/Divider';
import Badge from 'material-ui/Badge';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import AssignmentIcon from 'material-ui/svg-icons/action/assignment';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Sticky from 'react-sticky';

import AppColors from '../theme/appColors';
import LoginStore from '../../shared/stores/loginStore';
import AppStore from '../../shared/appStore';

class NavigationBar extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            openPopover: false
        };

        this.styles = {
            spacer: {
                width: 20
            },
            button: {
                margin: 0,
                color: AppColors.light3
            },
            menuIcon: {
                marginLeft: 10,
                marginRight: 10
            },
            titleToolbar: {
                height: 40,
                justifyContent: 'center',
                backgroundColor: AppColors.light3
            },
            titleBar: {
                lineHeight: '40px',
                textTransform: 'uppercase',
                color: AppColors.dark3
            },
            username: {
                color: AppColors.light3
            },
            addButton: {
                position: 'fixed',
                top: 83,
                right: 55
            },
            badge: {
                padding: '0px 4px 0px 0px'
            },
            badgeContent: {
                zIndex: 1,
                color: AppColors.light3,
                backgroundColor: AppColors.bright3
            }
        };

        this.onMenuIconClick = this.onMenuIconClick.bind(this);
        this.onPopoverClose = this.onPopoverClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.linkTo = this.linkTo.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
    }

    componentDidMount() {
        AppStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this.onChange);
    }

    onChange() {
        var pageTitle = AppStore.getTitle();
        this.setState({ title: pageTitle });
    }

    onMenuIconClick() {
        this.props.onMenuIconClick();
    }

    onIconButtonClick = (event) => {
        event.preventDefault();
        this.setState({ openPopover: true, anchorEl: event.currentTarget });
    }
    
    linkTo(route) {
        this.context.router.history.push(route);
    }

    onSignOut() {
        LoginStore.signOut();
        this.setState({ openPopover: false });
        this.context.router.history.push("/");
    }

    onPopoverClose() {
        this.setState({ openPopover: false });
    }

    getLoggedInControls() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <IconButton disableTouchRipple={ true } onTouchTap={ this.onMenuIconClick } style={ this.styles.menuIcon }>
                            <MenuIcon color={ AppColors.light3 } />
                        </IconButton>
                        <ToolbarTitle text={ <Link to="/">Stock Trading Journal</Link> } />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <Badge badgeContent={4} style={ this.styles.badge } badgeStyle={ this.styles.badgeContent }>
                            <IconButton tooltip="Open trades">
                                <AssignmentIcon color={ AppColors.light3 } onTouchTap={ () => { this.linkTo("/trades") } } />
                            </IconButton>
                        </Badge>
                        <IconButton tooltip="Help">
                            <HelpIcon color={ AppColors.light3 } />
                        </IconButton>
                        <div style={ this.styles.username }>{ LoginStore.getAuthenticatedUser().email }</div>
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
                                <MenuItem primaryText="Settings" />
                                <MenuItem primaryText="Contact us" />
                                <MenuItem primaryText="Upgrade account" />
                                <Divider />
                                <MenuItem primaryText="Sign out" onTouchTap={ this.onSignOut } />
                            </Menu>
                        </Popover>                        
                    </ToolbarGroup>
                </Toolbar>
                <Toolbar style={ this.styles.titleToolbar }>
                    <ToolbarTitle text={ this.state.title } style={ this.styles.titleBar }/>
                </Toolbar>
                <FloatingActionButton mini={ true } backgroundColor={ AppColors.bright3 } style={ this.styles.addButton } title="Add trade" >
                    <ContentAdd />
                </FloatingActionButton>
            </div>
        );
    }

    getNotLoggedInControls() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <div style={ this.styles.spacer } />
                        <ToolbarTitle text={ <Link to="/">Stock Trading Journal</Link> } />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <FlatButton style={ this.styles.button } label="Signup" onTouchTap={ () => { this.linkTo("/signup") } } />
                        <FlatButton style={ this.styles.button } label="Login" onTouchTap={ () => { this.linkTo("/login") } } />
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }

    getToolbarControls() {
        if (LoginStore.isUserAuthenticated()) {
            return this.getLoggedInControls();
        }

        return this.getNotLoggedInControls();
    }

    render() {
        return (
            <Sticky>
                { this.getToolbarControls() }                
            </Sticky>
        );
    }
}

NavigationBar.contextTypes = {
    router: React.PropTypes.object
};

export default NavigationBar;