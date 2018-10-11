import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = (theme) => ({
  card: {
    backgroundColor: '#e0e0e0',
    margin: "0 auto",
    marginBottom: 6,
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
        <br/>
      </CardContent>
    </Card>)
  }
}

export default withStyles(styles)(CraftingStationCard);