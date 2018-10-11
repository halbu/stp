import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ImageLoader from '../image-loader/Image-Loader';


const styles = (theme) => ({
  card: {
    backgroundColor: '#e0e0e0',
    margin: "0 auto",
    marginBottom: 6,
    width: 300,
  },
  divider: {
    margin: 10,
  },
});

class CraftingStationCard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
      <CardContent>
        <Typography variant="h6">
          {this.props.crafting_station}
        </Typography>
        <Divider className={classes.divider} />
        <ImageLoader picture={this.props.crafting_station} />
        <br/>
      </CardContent>
    </Card>)
  }
}

export default withStyles(styles)(CraftingStationCard);