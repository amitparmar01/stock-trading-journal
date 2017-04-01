import React, { Component } from 'react';

import AppActions from '../../shared/appActions';

class Trades extends Component {
    componentDidMount() {
        AppActions.updateTitle("Trades");
    }
    render() {
        return (
            <div>
                trades here!
            </div>
        );
    }
}

export default Trades;
