import React, { Component } from 'react';

import AppActions from '../../shared/appActions';

class Analysis extends Component {    
    componentDidMount() {
        AppActions.updateTitle("Analysis");
    }

    render() {
        return (
            <div>
                Analysis here!
            </div>
        );
    }
}

export default Analysis;