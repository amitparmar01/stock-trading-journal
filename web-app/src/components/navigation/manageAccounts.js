import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import Star from 'material-ui/svg-icons/toggle/star';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Unchecked from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import Check from 'material-ui/svg-icons/navigation/check';
import Delete1 from 'material-ui/svg-icons/action/highlight-off';
import Delete2 from 'material-ui/svg-icons/content/clear';
import Delete3 from 'material-ui/svg-icons/navigation/cancel';

import AppColors from '../theme/appColors';

class ManageAccount extends Component {
    constructor() {
        super();
        
        this.state = {
        }

        this.styles = {
            dialog: {
                width: 400
            }
        };

        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props.onClose();
    }

    render() {
        const actions = [
            <FlatButton label="Close" primary={ true } onTouchTap={ this.onClose } />,
        ];

        return (
            <div>
                <Dialog title="Accounts" actions={ actions } contentStyle={ this.styles.dialog } open={ this.props.Open } onRequestClose={ this.onClose }>
                    <List>
                        <ListItem primaryText="Inbox" leftIcon={ <Star /> } rightIcon={ <Delete1 /> } />
                        <ListItem primaryText="Default" leftIcon={ <Check /> } />
                        <ListItem primaryText="Sent mail" leftIcon={ <StarBorder /> } rightIcon={ <Delete2 /> } />
                        <ListItem primaryText="Drafts" leftIcon={ <Unchecked /> } rightIcon={ <Delete3 /> } />
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default ManageAccount;
