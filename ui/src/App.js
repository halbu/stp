import React, { Component } from 'react';
import './App.css';
import recipes from '../src/assets/output.json';
import { withStyles } from '@material-ui/core/styles';
import MainCard from './main-card/Main-Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import IngredientList from './ingredient-list/Ingredient-List'
import CraftingStationCard from './crafting-station-card/Crafting-Station-Card';

const styles = (theme) => ({
  cardcontainer: {
    backgroundColor: '#ffffff',
  },
  searchboxcontainer: {
    backgroundColor: '#888',
  },
  searchbox: {
    width: 700,
  },
  selectdiv: {
    marginBottom: 100,
  },
  titlediv: {
    color: '#fff',
    marginTop: 20,
    marginBottom: 75,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: recipes.map(r => r.recipe_name),
      activeItemNumber: 179,
      options: [],
      selectedOption: null,
      history: [], // TODO back button or something
    };
  }

  handleChange (selectedOption) {
    this.setState({ selectedOption });
    this.setState({ activeItemNumber: selectedOption.value });
  }

  activeItem() {
    return recipes[this.state.activeItemNumber];
  }

  componentDidMount() {
    // this could definitely be less ugly
    for (var i=0; i!==recipes.length; ++i) {
      this.state.options.push({
        label: recipes[i].recipe_name, value: recipes[i].index_value
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { selectedOption } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <Typography className={classes.titlediv} variant="h5">
            stationeers quick reference
          </Typography>
          <div className={classes.selectdiv}>
            <Select
              className={classes.searchbox}
              value={selectedOption}
              onChange={this.handleChange.bind(this)}
              options={this.state.options}
            />
          </div>

            <Grid container className={classes.cardcontainer} direction="row" spacing={24}>

              <Grid item xs={4}>
                Crafting Station<br/><br/>
                <CraftingStationCard crafting_station={this.activeItem().crafting_station}/>
              </Grid>
              <Grid item xs={4}>
                Item<br/><br/>
                <MainCard item={this.state.activeItemNumber} />
              </Grid>
              <Grid item xs={4}>
                Requirements<br/><br/>
                {this.activeItem().ingredients.map((item, i) => {
                    return ( <IngredientList key={i} item={item} /> )
                  })}
              </Grid>

          </Grid>
        </header>
      </div>
    );
  }
}

export default withStyles(styles)(App);
