import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

import LoginStore from '../../shared/stores/loginStore';
import AppActions from '../../shared/appActions';

class Login extends Component {
    constructor() {
        super();

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        LoginStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        LoginStore.removeChangeListener(this.onChange);
    }

    onChange() {
        this.context.router.history.push("/dashboard");
    }

    render() {
        return (
            <div>
                Login!!!
                <br />
                <RaisedButton label="Login" onTouchTap={ () => { AppActions.signIn() } } />
            </div>
        );
    }
}

Login.contextTypes = {
    router: React.PropTypes.object
};

export default Login;