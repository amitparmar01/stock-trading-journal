import React, { Component } from 'react';

import AppActions from '../../shared/appActions';

class DashboardPage extends Component {
    componentDidMount() {
        AppActions.updateTitle("Dashboard");
    }

    render() {
        return (
            <div>
                Dashboard here!
            </div>
        );
    }
}

export default DashboardPage;