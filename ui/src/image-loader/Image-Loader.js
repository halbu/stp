import React, { Component } from 'react';

class ImageLoader extends Component {
    render() {
        let asset;
        try {
            asset = require(`../assets/sprites/${this.props.picture}.png`);

            return (
                <img src={asset} alt="Sprite for {this.props.picture}" />
            )
        }
        catch (e) {
            // Oh well, never mind!
            return null;
        }
    }
}

export default (ImageLoader);