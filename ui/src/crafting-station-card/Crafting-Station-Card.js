import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ImageLoader from '../image-loader/Image-Loader';

const styles = (theme) => ({
  card: {
    margin: "0 auto",
    marginBottom: 10,
    width: 300,
    position: 'relative',
    transition: 'all 150ms ease-in-out',
    backgroundColor: '#e0e0e0',
    '&:hover': {
      cursor: 'pointer',
      top: -3,
      boxShadow: '0px 4px 8px #808080',
    }
  },
  divider: {
    margin: 10,
  },
});

class CraftingStationCard extends Component {

  itemName = () => { return this.props.crafting_station; }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card} style={{backgroundColor: this.props.myColor}} onClick={this.clickHandler}>
        <CardContent>
          <Typography variant="h5"> {this.itemName()} </Typography>
          <Divider className={classes.divider} />
          <ImageLoader picture={this.itemName()} />
        </CardContent>
      </Card>
    )
  }

  clickHandler = () => {
    this.props.onSelectItem(this.props.myIndexValue);
  }
}

export default withStyles(styles)(CraftingStationCard);