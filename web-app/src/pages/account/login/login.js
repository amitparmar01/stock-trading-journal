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

        this.state = {
            formError: "",
            emailValue: "",
            emailError: "",
            passwordValue: "",
            passwordError: ""
        }

        this.styles = {
            main: {
                width: 300,
                margin: 40,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
            },
            formError: {
                top: -10,
                position: 'absolute',
                width: '100%',
                textAlign: 'center'
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
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.signIn = this.signIn.bind(this);
    }

    componentDidMount() {
        AppStore.addChangeListener(this.onChange);
        
        // comment the below line out for production
        //AppActions.signIn("user@email.com", "");
    }

    componentWillUnmount() {
        AppStore.removeChangeListener(this.onChange);
    }

    onChange() {
        var lastError = AppStore.getUserLastError();
        
        if (lastError === "") {
            this.context.router.history.push("/dashboard");
        }
        else {
            this.setState({ formError: lastError });
        }
    }

    onEmailChange(event, value) {
        this.setState({ emailValue: value, emailError: "", formError: "" });
    }

    onPasswordChange(event, value) {
        this.setState({ passwordValue: value, passwordError: "", formError: "" });
    }

    signIn() {
        var emailErrorText = "";
        var passwordErrorText = "";

        if (this.state.emailValue === "") {
            emailErrorText = "Email is required";
        }
        if (this.state.passwordValue === "") {
            passwordErrorText = "Password is required";
        }

        if (emailErrorText !== "" || passwordErrorText !== "") {
            this.setState({ emailError: emailErrorText, passwordError: passwordErrorText });
        }
        else {
            AppActions.signIn(this.state.emailValue, this.state.passwordValue);
        }        
    }

    render() {
        return (
            <Paper zDepth={ 1 }>
            <div style={ this.styles.main }>
                <div className="error-text" style={ this.styles.formError }>{ this.state.formError }</div>
                <TextField value={ this.state.emailValue } floatingLabelText="Email" fullWidth={ true } errorText={ this.state.emailError } onChange={ this.onEmailChange } />
                <TextField value={ this.state.passwordValue } floatingLabelText="Password" type="password" fullWidth={ true } errorText={ this.state.passwordError } onChange={ this.onPasswordChange } />
                <div style={ this.styles.signInButtonContainer }>
                    <Link to="/reset-password" style={ this.styles.marginRight }>Forgot your password?</Link>
                    <RaisedButton label="Sign in" primary={ true } onTouchTap={ this.signIn } />
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