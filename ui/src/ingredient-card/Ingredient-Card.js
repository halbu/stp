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
    width: 300,
  },
});

class IngredientCard extends Component {

 itemName = () =>    { return Object.keys(this.props.item)[0] };
 itemAmount = () =>  { return this.props.item[this.itemName()] };

  render() {
    const { classes } = this.props;
    let bgCol = this.itemName() === "Energy" ? "#f0f0d8":
                this.itemName() === "Time" ? '#e0f0e0' : '#e0e0e0'
    return (
      <Card style={{backgroundColor: bgCol}} className={classes.card}>
        <CardContent>
          <Typography variant="h5">
            {this.itemName()}: {this.itemAmount()}
          </Typography>
        </CardContent>
      </Card>)
  }
}

export default withStyles(styles)(IngredientCard);