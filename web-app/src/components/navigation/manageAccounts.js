import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import Check from 'material-ui/svg-icons/av/fiber-manual-record';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Delete from 'material-ui/svg-icons/content/clear';
import SwipeableViews from 'react-swipeable-views';

import '../../index.css';
import AppColors from '../theme/appColors';

class ManageAccount extends Component {
    constructor() {
        super();
        
        this.state = {
            dialogTitle: "Accounts",
            mouseOverId: 0,
            accounts: [
                { id: 1, name: "demo", selected: false },
                { id: 2, name: "Default", selected: true },
                { id: 3, name: "test", selected: false },
                { id: 4, name: "Live account", selected: false }
            ],
            accountNameError: "",
            viewIndex: 1,
            accountToModify: { name: "" }
        }

        this.styles = {
            dialog: {
                width: 500
            },
            view: {
                height: 240
            },
            error: {
                color: AppColors.error
            }
        };

        this.onClose = this.onClose.bind(this);
        this.onAccountMouseOver = this.onAccountMouseOver.bind(this);
        this.onAccountMouseLeave = this.onAccountMouseLeave.bind(this);
        this.onAccountClick = this.onAccountClick.bind(this);
        this.generateAccountsList = this.generateAccountsList.bind(this);
        this.onAddAccount = this.onAddAccount.bind(this);
        this.onUpdateAccount = this.onUpdateAccount.bind(this);
        this.cancelUpdateAccount = this.cancelUpdateAccount.bind(this);
        this.updateAccount = this.updateAccount.bind(this);
        this.onDeleteAccount = this.onDeleteAccount.bind(this);
        this.cancelDeleteAccount = this.cancelDeleteAccount.bind(this);
        this.deleteAccount = this.deleteAccount.bind(this);
        this.accountNameChange = this.accountNameChange.bind(this);
    }

    onClose() {
        var selectedItem = this.state.accounts.find(x => x.selected === true);
        this.props.onClose(selectedItem);
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

    onUpdateAccount(event) {
        var id = parseInt(event.currentTarget.dataset.id, 10);
        var account = this.state.accounts.find(x => x.id === id);
        var title = "Update '" + account.name + "'";

        this.setState({ viewIndex : 0, dialogTitle: title, accountToModify: account });
    }

    onDeleteAccount(event) {
        var id = parseInt(event.currentTarget.dataset.id, 10);
        var account = this.state.accounts.find(x => x.id === id);
        var title = "Delete '" + account.name + "'";

        this.setState({ viewIndex : 2, dialogTitle: title, accountToModify: account });
    }

    generateAccountsList() {
        var list = this.state.accounts.map((item, index) => {
            var iconButton = (
                <div>
                    <IconButton data-id={ item.id } onTouchTap={ this.onUpdateAccount }><Edit color={ AppColors.dark4 } /></IconButton>
                    <IconButton data-id={ item.id } onTouchTap={ this.onDeleteAccount }><Delete color={ AppColors.dark4 } /></IconButton>
                </div>
            );
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

    onAddAccount() {
        this.setState({ viewIndex : 0, dialogTitle: "Add account", accountToModify: { name: "" } });
    }

    cancelUpdateAccount() {
        this.setState({ viewIndex: 1, dialogTitle: "Accounts", accountToModify: { name: "" } });
    }

    updateAccount() {
        var accountNameErrorText = "";

        if (this.state.accountToModify.name === "") {
            accountNameErrorText = "Name is required";
        }

        if (accountNameErrorText !== "" ) {
            this.setState({ accountNameError: accountNameErrorText });
        }
        else {
            var accounts = this.state.accounts.slice();
            this.setState({ viewIndex: 1, accounts: accounts, accountToModify: { name: "" } });
        }
    }

    accountNameChange(event, value) {
        var account = this.state.accountToModify;
        account.name = value;

        this.setState({ accountToModify: account, accountNameError: "" });
    }

    deleteAccount() {
        var accounts = this.state.accounts.slice();
        var itemIndex = accounts.findIndex(x => x.id === this.state.accountToModify.id);
        accounts.splice(itemIndex, 1);

        this.setState({ viewIndex: 1, accounts: accounts, accountToModify: { name: "" } });
    }

    cancelDeleteAccount() {
        this.setState({ viewIndex: 1, dialogTitle: "Accounts", accountToModify: { name: "" } });
    }

    render() {
        var actions = null;
        switch (this.state.viewIndex) {
            case 0:
                actions = [
                    <FlatButton label="Back" primary={ true } onTouchTap={ this.cancelUpdateAccount } />,
                    <FlatButton label="Update" primary={ true } onTouchTap={ this.updateAccount } />
                ];
                break;
            case 2:
                actions = [
                    <FlatButton label="Back" primary={ true } onTouchTap={ this.cancelDeleteAccount } />,
                    <FlatButton label="Delete" primary={ true } onTouchTap={ this.deleteAccount } />
                ];
                break;
            default:
                actions = [
                    <FlatButton label="Add" primary={ true } onTouchTap={ this.onAddAccount } />,
                    <FlatButton label="Close" primary={ true } onTouchTap={ this.onClose } />
                ];
                break;
        }

        var listItems = this.generateAccountsList();

        return (
            <div>
                <Dialog title={ this.state.dialogTitle } actions={ actions } contentStyle={ this.styles.dialog } open={ this.props.Open } onRequestClose={ this.onClose }>
                    <div>
                    <SwipeableViews index={ this.state.viewIndex }>
                        <div style={ this.styles.view }>
                            <TextField value={ this.state.accountToModify.name } floatingLabelText="Name" fullWidth={ true } maxLength="50" onChange={ this.accountNameChange } errorText={ this.state.accountNameError } />
                        </div>
                        <div style={ this.styles.view }>
                        <List>
                            { listItems }
                        </List>
                        </div>
                        <div style={ this.styles.view }>
                            <span>Are you sure you want to delete this account?</span>
                            <br />
                            <br />
                            <span style={ this.styles.error }>This will delete all trades and information associated with the account.  This action cannot be undone.</span>
                        </div>
                    </SwipeableViews>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default ManageAccount;
