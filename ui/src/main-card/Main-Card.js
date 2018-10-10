import React, { Component } from 'react';
import './Main-Card.css';
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
    width: 325,
    margin: "0 auto",
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
        <ImageLoader picture={recipes[this.props.item].recipe_name} />
        <Divider className={classes.divider} />
        {recipes[this.props.item].ingredients.map((recipe, i) => {     
          let ing = Object.keys(recipe)[0];
          let amt = recipe[ing];
            return (
              <Typography variant="h5" key={i} color="textSecondary">
                {ing} : {amt}
            </Typography>) 
          })}
      </CardContent>
    </Card>)
  }
}

export default withStyles(styles)(MainCard);