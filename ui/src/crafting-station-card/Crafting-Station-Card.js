import React, { Component } from 'react';
import recipes from '../../src/assets/output.json';
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
  constructor(props) {
    super(props);
    this.state= {
      parentActiveItem: this.props.itemno,
    }
  }

  findByName(recipeName) {
    for (var i=0; i!==recipes.length; ++i) {
      if (recipes[i].recipe_name === ('ItemKit' + recipeName)) {
        // console.log(i);
        return i;
      }
    }
    console.log("Failed to find recipe");
    return 0;    
  }

  render() {
    const { classes } = this.props;

    return (
      <Card className={classes.card} onClick={this.clickHandler}>
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

  clickHandler = () => {
    this.props.onSelectItem(this.findByName(this.props.crafting_station));
  }
}

export default withStyles(styles)(CraftingStationCard);