import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = (theme) => ({
  card: {
    backgroundColor: '#e8d8d8',
    margin: "0 auto",
    marginBottom: 6,
    width: 300,
  },
});

class ConditionCard extends Component {
  render() {
    const { classes } = this.props;
    
    return (
      <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5">
          {this.props.cond}
        </Typography>
        <Typography variant="h6">
          Low {this.props.item["Start"]} — High {this.props.item["Stop"]}
        </Typography>
      </CardContent>
    </Card>)
  }
}

export default withStyles(styles)(ConditionCard);