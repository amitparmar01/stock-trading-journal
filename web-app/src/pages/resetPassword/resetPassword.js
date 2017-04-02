import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import AppStore from '../../shared/appStore';
import AppActions from '../../shared/appActions';

class ResetPassword extends Component {
    constructor() {
        super();

        this.styles = {
            main: {
                width: 300,
                margin: 40,
                display: 'flex',
                flexDirection: 'column'
            },
            resetButtonContainer: {
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 30
            },
            signInLinkContainer: {
                display: 'flex',
                marginTop: 30,
                justifyContent: 'flex-end'
            },
            signUpLinkContainer: {
                display: 'flex',
                marginTop: 10,
                justifyContent: 'flex-end'
            },
            marginRight: {
                marginRight: 6
            }
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AppStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this.onChange);
    }

    onChange() {
        // display: please check your email for instructions
    }

    render() {
        return (
            <Paper zDepth={ 1 }>
            <div style={ this.styles.main }>
                <TextField floatingLabelText="Email" fullWidth={ true } />
                <div style={ this.styles.resetButtonContainer }>
                    <RaisedButton label="Reset password" primary={ true } onTouchTap={ () => { AppActions.resetPassword("") } } />
                </div>
                <div style={ this.styles.signInLinkContainer }>
                    <div style={ this.styles.marginRight }>Already a member?</div>
                    <Link to="/signin">Sign in</Link>
                </div>
                <div style={ this.styles.signUpLinkContainer }>
                    <div style={ this.styles.marginRight }>Don't have an account?</div>
                    <Link to="/signup">Sign up</Link>
                </div>
            </div>
            </Paper>
        );
    }
}

export default ResetPassword;