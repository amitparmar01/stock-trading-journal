import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';

import AppActions from '../../shared/appActions';

class ContactUs extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            reasonValue: "",
            error: "",
            textValue: "",
            textError: ""
        }

        this.styles = {
            main: {
                display: 'flex',
                flexDirection: 'column'
            },
            textarea: {
                resize: 'none'
            }
        };

        this.onClose = this.onClose.bind(this);
        this.reasonChange = this.reasonChange.bind(this);
        this.textChange = this.textChange.bind(this);
        this.onSend = this.onSend.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.state = {
            reasonValue: "",
            error: "",
            textValue: "",
            textError: ""
        }
    }

    onClose() {
        this.props.onClose();
    }

    reasonChange(event, index, value) {
        this.setState({ reasonValue: value, reasonError: "" });
    }

    textChange(event, value) {
        this.setState({ textValue: value, textError: "" });
    }

    onSend() {
        var reasonErrorText = "";
        var textErrorText = "";

        if (this.state.reasonValue === "") {
            reasonErrorText = "Reason for contacting us is required";
        }
        if (this.state.textValue === "") {
            textErrorText = "Message text is required";
        }

        if (reasonErrorText !== "" || textErrorText !== "") {
            this.setState({ reasonError: reasonErrorText, textError: textErrorText });
        }
        else {
            AppActions.SendContactUsMessage(this.state.reasonValue, this.state.textValue);
            this.onClose();
        }
    }

    render() {
        const actions = [
            <FlatButton label="Cancel" primary={ true } onTouchTap={ this.onClose } />,
            <FlatButton label="Add" primary={ true } keyboardFocused={ true } onTouchTap={ this.onSend } />
        ];

        return (
            <div>
                <Dialog title="Contact us" actions={ actions } open={ this.props.Open } onRequestClose={ this.onClose }>
                    <div style={ this.styles.main }>
                        <SelectField value={ this.state.reasonValue } floatingLabelText="Reason for contacting us" onChange={ this.reasonChange } errorText={ this.state.reasonError }>
                            <MenuItem key={ 4 } value={ "General question" } primaryText="General question" />
                            <MenuItem key={ 1 } value={ "Suggestion or feedback" } primaryText="Suggestion or feedback" />
                            <MenuItem key={ 2 } value={ "Problem with the website" } primaryText="Problem with the website" />
                            <MenuItem key={ 3 } value={ "Problem with payment" } primaryText="Problem with payment" />
                        </SelectField>
                        <TextField value={ this.state.textValue } style={ this.styles.textarea } maxLength="1000" fullWidth={ true } multiLine={ true } rows={ 8 } rowsMax={ 14 } onChange={ this.textChange } errorText={ this.state.textError } />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default ContactUs;