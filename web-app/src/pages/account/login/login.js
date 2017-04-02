import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

import AppStore from '../../../shared/appStore';
import AppActions from '../../../shared/appActions';

class Login extends Component {
    constructor() {
        super();

        this.styles = {
            main: {
                width: 300,
                margin: 40,
                display: 'flex',
                flexDirection: 'column'
            },
            signInButtonContainer: {
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginTop: 30
            },
            signUpLinkContainer: {
                display: 'flex',
                marginTop: 30,
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
                <TextField floatingLabelText="Password" type="password" fullWidth={ true } />
                <div style={ this.styles.signInButtonContainer }>
                    <Link to="/reset-password" style={ this.styles.marginRight }>Forgot your password?</Link>
                    <RaisedButton label="Sign in" primary={ true } onTouchTap={ () => { AppActions.signIn("", "") } } />
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

Login.contextTypes = {
    router: React.PropTypes.object
};

export default Login;