import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import '../../../index.css';
import AppActions from '../../../shared/appActions';

class Settings extends Component {
    constructor() {
        super();

        this.state = {
        };

        this.styles = {
            main: {
                width: '100%'
            },
            label: {
                display: 'block'
            },
            header: {
                marginBottom: 20,
                padding: 20
            },
            content: {
                height: 600,
                padding: 20
            }
        };
    }

    componentDidMount() {
        AppActions.updateTitle("Settings");
    }

    render() {
        return (
            <div style={ this.styles.main }>
                <Paper style={ this.styles.header } rounded={ false } zDepth={ 1 }>
                    <span className="medium-text" style={ this.styles.label }>lalernehl@gmail.com</span>
                    <span className="small-text" style={ this.styles.label }>JOINED 2 MONTHS AGO</span>
                    <span className="small-text" style={ this.styles.label }>FREE ACCOUNT</span>
                </Paper>
                <Paper style={ this.styles.content } rounded={ false } zDepth={ 2 }>
                    Hello Settings
                </Paper>
            </div>
        );
    }
}

export default Settings;