import React, { Component } from 'react';

import AppActions from '../../shared/appActions';

class Analytics extends Component {    
    componentDidMount() {
        AppActions.updateTitle("Analytics");
    }

    render() {
        return (
            <div>
                Analytics here!
            </div>
        );
    }
}

export default Analytics;