import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import Popover, {PopoverAnimationVertical} from 'material-ui/Popover';
import { Link } from 'react-router-dom';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Dialog from 'material-ui/Dialog';
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
import AppStore from '../../shared/appStore';
import AppActions from '../../shared/appActions';

class NavigationBar extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            openPopover: false,
            contactUsDialogOpen: false,
            contactUsReasonValue: "",
            contactUsError: "",
            contactUsTextValue: "",
            contactUsTextError: ""
        };

        this.styles = {
            sticky: {
                zIndex: 999
            },
            spacer: {
                width: 20
            },
            linkButton: {
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
            },
            contactUsMain: {
                display: 'flex',
                flexDirection: 'column'
            },
            contactUsTextarea: {
                resize: 'none'
            }
        };

        this.onMenuIconClick = this.onMenuIconClick.bind(this);
        this.onPopoverClose = this.onPopoverClose.bind(this);
        this.onChange = this.onChange.bind(this);
        this.linkTo = this.linkTo.bind(this);
        this.onContactUs = this.onContactUs.bind(this);
        this.onContactUsClose = this.onContactUsClose.bind(this);
        this.onContactUsReasonChange = this.onContactUsReasonChange.bind(this);
        this.onContactUsTextChange = this.onContactUsTextChange.bind(this);
        this.onContactUsSend = this.onContactUsSend.bind(this);
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
        AppStore.signOut();
        this.setState({ openPopover: false });
        this.context.router.history.push("/");
    }

    onPopoverClose() {
        this.setState({ openPopover: false });
    }

    onContactUs() {
        this.setState({ contactUsDialogOpen: true, openPopover: false });
    }

    onContactUsReasonChange(event, index, value) {
        this.setState({ contactUsReasonValue: value, contactUsReasonError: "" });
    }

    onContactUsTextChange(event, value) {
        this.setState({ contactUsTextValue: value, contactUsTextError: "" });
    }

    onContactUsSend() {
        var contactUsReasonErrorText = "";
        var contactUsTextErrorText = "";

        if (this.state.contactUsReasonValue === "") {
            contactUsReasonErrorText = "Reason for contacting us is required";
        }
        if (this.state.contactUsTextValue === "") {
            contactUsTextErrorText = "Message text is required";
        }

        if (contactUsReasonErrorText !== "" || contactUsTextErrorText !== "") {
            this.setState({ contactUsReasonError: contactUsReasonErrorText, contactUsTextError: contactUsTextErrorText });
        }
        else {
            AppActions.SendContactUsMessage(this.state.contactUsReasonValue, this.state.contactUsTextValue);
            this.setState({ contactUsDialogOpen: false });
        }
    }

    onContactUsClose() {
        this.setState({ contactUsDialogOpen: false });
    }

    getLoggedInControls() {
        const contactUsDialogActions = [
            <FlatButton label="Cancel" primary={ true } onTouchTap={ this.onContactUsClose } />,
            <FlatButton label="Send" primary={ true } onTouchTap={ this.onContactUsSend } />
        ];

        return (
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <IconButton disableTouchRipple={ true } onTouchTap={ this.onMenuIconClick } style={ this.styles.menuIcon }>
                            <MenuIcon color={ AppColors.light3 } />
                        </IconButton>
                        <ToolbarTitle text={ <Link className="main-link" to="/">Stock Trading Journal</Link> } />
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
                        <div style={ this.styles.username }>{ AppStore.getAuthenticatedUser().email }</div>
                        <IconButton disableTouchRipple={ true } onTouchTap={ this.onIconButtonClick }>
                            <NavigationExpandMoreIcon color={ AppColors.light3 } />
                        </IconButton>
                        <Popover open={ this.state.openPopover } anchorEl={this.state.anchorEl} onRequestClose={ this.onPopoverClose } animation={ PopoverAnimationVertical }>
                            <Menu>
                                <MenuItem primaryText="Settings" />
                                <MenuItem primaryText="Contact us" onTouchTap={ this.onContactUs } />
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
                <Dialog title="Contact us" actions={ contactUsDialogActions } open={ this.state.contactUsDialogOpen } onRequestClose={ this.onContactUsClose }>
                    <div style={ this.styles.contactUsMain }>
                        <SelectField value={ this.state.contactUsReasonValue } floatingLabelText="Reason for contacting us" onChange={ this.onContactUsReasonChange } errorText={ this.state.contactUsReasonError }>
                            <MenuItem key={ 4 } value={ "General question" } primaryText="General question" />
                            <MenuItem key={ 1 } value={ "Suggestion or feedback" } primaryText="Suggestion or feedback" />
                            <MenuItem key={ 2 } value={ "Problem with the website" } primaryText="Problem with the website" />
                            <MenuItem key={ 3 } value={ "Problem with payment" } primaryText="Problem with payment" />
                        </SelectField>
                        <TextField id="contact-us" value={ this.state.contactUsTextValue } style={ this.styles.contactUsTextarea } maxLength="1000" fullWidth={ true } multiLine={ true } rows={ 8 } rowsMax={ 14 } onChange={ this.onContactUsTextChange } errorText={ this.state.contactUsTextError } />
                    </div>
                </Dialog>
            </div>
        );
    }

    getNotLoggedInControls() {
        return (
            <div>
                <Toolbar>
                    <ToolbarGroup firstChild={true}>
                        <div style={ this.styles.spacer } />
                        <ToolbarTitle text={ <Link className="main-link" to="/">Stock Trading Journal</Link> } />
                    </ToolbarGroup>
                    <ToolbarGroup>
                        <FlatButton style={ this.styles.linkButton } label="Sign up" onTouchTap={ () => { this.linkTo("/signup") } } />
                        <FlatButton style={ this.styles.linkButton } label="Sign in" onTouchTap={ () => { this.linkTo("/login") } } />
                    </ToolbarGroup>
                </Toolbar>
            </div>
        );
    }

    getToolbarControls() {
        if (AppStore.isUserAuthenticated()) {
            return this.getLoggedInControls();
        }

        return this.getNotLoggedInControls();
    }

    render() {
        return (
            <Sticky style={ this.styles.sticky }>
                { this.getToolbarControls() }                
            </Sticky>
        );
    }
}

NavigationBar.contextTypes = {
    router: React.PropTypes.object
};

export default NavigationBar;