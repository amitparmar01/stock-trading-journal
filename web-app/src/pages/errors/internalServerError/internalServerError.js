import React, { Component } from 'react';

import AppActions from '../../../shared/appActions';

class InternalServerError extends Component {
    componentDidMount() {
        AppActions.updateTitle("Error");
    }

    render() {
        return (
            <div>
                500!!!
            </div>
        );
    }
}

export default InternalServerError;