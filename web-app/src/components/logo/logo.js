import React, { Component } from 'react';
import Trianglify from 'trianglify';

import './logo.css';

class Logo extends Component {
    constructor(props) {
        super(props);
        
        var size = 50;
        if (props.size) {
            size = this.props.size;
        }

        this.styles = {
            logo: {
                width: size,
                height: size,
                borderRadius: "50%",
                animation: "spin infinite 20s linear"
            }
        };

        this.styles.logo = Object.assign(this.styles.logo, this.props.style);
    }

    componentDidMount() {
        var pattern = Trianglify();
        pattern.canvas(this.refs.logo);
    }

    render() {
        return (
            <canvas ref="logo" style={ this.styles.logo } />
        );
    }
}

export default Logo;