import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import AppStore from '../../../shared/appStore';
import AppActions from '../../../shared/appActions';

class Signup extends Component {
    constructor() {
        super();

        this.styles = {
            main: {
                width: 340,
                margin: 40,
                display: 'flex',
                flexDirection: 'column'
            },
            signUpButtonContainer: {
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 30
            },
            signInLinkContainer: {
                display: 'flex',
                marginTop: 30,
                justifyContent: 'flex-end'
            },
            termsLinkContainer: {
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
        this.context.router.history.push("/dashboard");
    }

    render() {
        return (
            <Paper zDepth={ 1 }>
            <div style={ this.styles.main }>
                <TextField floatingLabelText="Email" fullWidth={ true } />
                <TextField floatingLabelText="Password" hintText="6 characters minimum" type="password" fullWidth={ true } />
                <TextField floatingLabelText="Password confirmation" hintText="Must match password" type="password" fullWidth={ true } />
                <div style={ this.styles.signUpButtonContainer }>
                    <RaisedButton label="Sign up" primary={ true } onTouchTap={ () => { AppActions.signUp("", "") } } />
                </div>
                <div style={ this.styles.signInLinkContainer }>
                    <div style={ this.styles.marginRight }>Already a member?</div>
                    <Link to="/signin">Sign in</Link>
                </div>
                <div style={ this.styles.termsLinkContainer }>
                    <div style={ this.styles.marginRight }>By signing up, you agree to our </div>
                    <Link to="/terms">Terms of use</Link>
                </div>
            </div>
            </Paper>
        );
    }
}

export default Signup;