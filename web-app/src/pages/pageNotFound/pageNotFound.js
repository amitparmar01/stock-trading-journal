import React, { Component } from 'react';

import AppActions from '../../shared/appActions';

class PageNotFound extends Component {
    componentDidMount() {
        AppActions.updateTitle("Error");
    }

    render() {
        return (
            <div>
                404!!!
            </div>
        );
    }
}

export default PageNotFound;