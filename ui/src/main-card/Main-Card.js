import React, { Component } from 'react';
import recipes from '../../src/assets/output.json';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import ImageLoader from '../image-loader/Image-Loader';


const styles = (theme) => ({
  card: {
    backgroundColor: '#e0e0e0',
    margin: "0 auto",
    width: 300,
  },
  divider: {
    margin: 10,
  },
});

class MainCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemNumber: props.item,
      suggestions: [],
    };
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card}>
      <CardContent>
        <Typography variant="h5">
          {recipes[this.props.item].recipe_name}
        </Typography>
        <Divider className={classes.divider} />
        <ImageLoader picture={recipes[this.props.item].recipe_name} />
      </CardContent>
    </Card>)
  }
}

export default withStyles(styles)(MainCard);