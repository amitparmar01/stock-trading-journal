import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Check from 'material-ui/svg-icons/av/fiber-manual-record';
import Delete from 'material-ui/svg-icons/content/clear';

import AppColors from '../theme/appColors';

class ManageAccount extends Component {
    constructor() {
        super();
        
        this.state = {
            mouseOverId: 0,
            accounts: [
                { id: 1, name: "demo", selected: false },
                { id: 2, name: "Default", selected: true },
                { id: 3, name: "test", selected: false },
                { id: 4, name: "Live account", selected: false }
            ]
        }

        this.styles = {
            dialog: {
                width: 400
            }
        };

        this.onClose = this.onClose.bind(this);
        this.onAccountMouseOver = this.onAccountMouseOver.bind(this);
        this.onAccountMouseLeave = this.onAccountMouseLeave.bind(this);
        this.onAccountClick = this.onAccountClick.bind(this);
        this.onDeleteAccount = this.onDeleteAccount.bind(this);
        this.generateAccountsList = this.generateAccountsList.bind(this);
    }

    onClose() {
        this.props.onClose();
    }

    onAccountMouseOver(sender, event) {
        var id = parseInt(sender.currentTarget.dataset.id, 10);
        this.setState({ mouseOverId: id });
    }
    
    onAccountMouseLeave(sender, event) {
        this.setState({ mouseOverId: 0 });
    }
    
    onAccountClick(sender, event) {
        var id = parseInt(sender.currentTarget.dataset.id, 10);
        var accounts = this.state.accounts.slice();
        var item = accounts.find(x => x.id === id);
        var selectedItem = accounts.find(x => x.selected === true);

        if (item.id !== selectedItem.id) {
            item.selected = true;
            selectedItem.selected = false;

            this.setState({ accounts: accounts });
        }
    }

    onDeleteAccount(event) {
        var id = parseInt(event.currentTarget.dataset.id, 10);
        var accounts = this.state.accounts.slice();
        var itemIndex = accounts.findIndex(x => x.id === id);
        accounts.splice(itemIndex, 1);

        this.setState({ accounts: accounts });
    }

    generateAccountsList() {
        var list = this.state.accounts.map((item, index) => {
            var iconButton = <IconButton data-id={ item.id } onTouchTap={ this.onDeleteAccount }><Delete color={ AppColors.dark4 } /></IconButton>;
            var leftIcon = item.selected ? <Check color={ AppColors.bright1 } /> : 
                                this.state.mouseOverId === item.id ? <Check color={ AppColors.light4 } /> : <Check color={ AppColors.light3 } />;
            var rightIcon = item.selected ? null : 
                                this.state.mouseOverId === item.id ? iconButton : null;

            return <ListItem 
                key={ item.id }
                data-id={ item.id }
                primaryText={ item.name } 
                onMouseOver={ this.onAccountMouseOver } 
                onMouseLeave={ this.onAccountMouseLeave } 
                onTouchTap={ this.onAccountClick }
                leftIcon={ leftIcon } 
                rightIconButton={ rightIcon } 
            /> 
        });

        return list;
    }

    render() {
        const actions = [
            <FlatButton label="Close" primary={ true } onTouchTap={ this.onClose } />,
        ];

        var listItems = this.generateAccountsList();

        return (
            <div>
                <Dialog title="Accounts" actions={ actions } contentStyle={ this.styles.dialog } open={ this.props.Open } onRequestClose={ this.onClose }>
                    <List>
                        { listItems }
                    </List>
                </Dialog>
            </div>
        );
    }
}

export default ManageAccount;
