import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';


  
const styles = (theme) => ({
    image: {
        height: 160,
        width: 160,
        borderRadius: 7,
        backgroundColor: '#a4a4a4',
        border: '2px solid black;'
    }
});
  
class ImageLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
          activeItemNumber: props.item,
          suggestions: [],
        };
      }
    
    render() {
        const { classes } = this.props;
        let asset;
        // all Circuitboard-type items share the same sprite, so intercept these requests and serve the generic image
        if (this.props.picture.substr(0, 12) === 'Circuitboard') {
          let asset = require(`../assets/sprites/Circuitboard.png`);
          return (<img className={classes.image} src={asset} alt="Sprite for {this.props.picture}" />)
        // same for Cartridges
        } else if (this.props.picture.substr(0, 9) === 'Cartridge') {
            let asset = require(`../assets/sprites/ItemCartridge.png`);
            return (<img className={classes.image}  src={asset} alt="Sprite for {this.props.picture}" />)
        } else {
            // Better try-catch as we're requesting an unknown image from the assets
            try {
                asset = require(`../assets/sprites/${this.props.picture}.png`);
                return (<img className={classes.image}  src={asset} alt="Sprite for {this.props.picture}" />)
            }
            catch (e) {
                return null; // Oh well, never mind!
            }
        }
    }
}

export default withStyles(styles)(ImageLoader);