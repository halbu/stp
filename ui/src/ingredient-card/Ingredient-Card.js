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

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5">
          {Object.keys(this.props.item)[0]}:&nbsp;
          {this.props.item[Object.keys(this.props.item)[0]]}
        </Typography>
      </CardContent>
    </Card>)
  }
}

export default withStyles(styles)(IngredientCard);