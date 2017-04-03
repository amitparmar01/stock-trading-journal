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

        this.state = {
            formError: "",
            emailValue: "",
            emailError: "",
            passwordValue: "",
            passwordError: "",
            passwordConfirmationValue: "",
            passwordConfirmationError: ""
        }

        this.styles = {
            main: {
                width: 340,
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
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onPasswordConfirmationChange = this.onPasswordConfirmationChange.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    componentDidMount() {
        AppStore.addChangeListener(this.onChange);
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

    onPasswordConfirmationChange(event, value) {
        this.setState({ passwordConfirmationValue: value, passwordConfirmationError: "", formError: "" });
    }

    signUp() {
        var emailErrorText = "";
        var passwordErrorText = "";
        var passwordConfirmationErrorText = "";
        var regex = /.+@.+/;
        if (this.state.emailValue === "") {
            emailErrorText = "Email is required";
        }
        if (!regex.test(this.state.emailValue)) {
            emailErrorText = "Invalid email address";
        }
        if (this.state.passwordValue.length < 6) {
            passwordErrorText = "6 characters minimum is required";
        }
        if (this.state.passwordValue === "") {
            passwordErrorText = "Password is required";
        }
        if (this.state.passwordConfirmationValue === "") {
            passwordConfirmationErrorText = "Password confirmation is required";
        }
        if (this.state.passwordValue !== this.state.passwordConfirmationValue) {
            passwordConfirmationErrorText = "Password and password confirmation must match";
        }

        if (emailErrorText !== "" || passwordErrorText !== "" || passwordConfirmationErrorText !== "") {
            this.setState({ emailError: emailErrorText, passwordError: passwordErrorText, passwordConfirmationError: passwordConfirmationErrorText });
        }
        else {
            AppActions.signUp(this.state.emailValue, this.state.passwordValue);
        }        
    }

    render() {
        return (
            <Paper zDepth={ 1 }>
            <div style={ this.styles.main }>
                <div className="error-text" style={ this.styles.formError }>{ this.state.formError }</div>
                <TextField value={ this.state.emailValue } floatingLabelText="Email" fullWidth={ true } errorText={ this.state.emailError } onChange={ this.onEmailChange } />
                <TextField value={ this.state.passwordValue } floatingLabelText="Password" hintText="6 characters minimum" type="password" fullWidth={ true } errorText={ this.state.passwordError } onChange={ this.onPasswordChange } />
                <TextField value={ this.state.passwordConfirmationValue } floatingLabelText="Password confirmation" hintText="Must match password" type="password" fullWidth={ true } errorText={ this.state.passwordConfirmationError } onChange={ this.onPasswordConfirmationChange } />
                <div style={ this.styles.signUpButtonContainer }>
                    <RaisedButton label="Sign up" primary={ true } onTouchTap={ this.signUp } />
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

Signup.contextTypes = {
    router: React.PropTypes.object
};

export default Signup;