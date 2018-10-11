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
    backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="28" height="49" viewBox="0 0 28 49"%3E%3Cg fill-rule="evenodd"%3E%3Cg id="hexagons" fill="%239C92AC" fill-opacity="0.1" fill-rule="nonzero"%3E%3Cpath d="M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`
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
            {/* stationeers quick reference */}
          </Typography>
          <div className={classes.selectdiv}>
            <Select
              className={classes.searchbox}
              value={selectedOption}
              onChange={this.handleChange.bind(this)}
              options={this.state.options}
            />
          </div>

            <Grid container className={classes.cardcontainer} direction="row" spacing={40}>

              <Grid item className={classes.griditem} xs={4}>
                Crafting Station(s)<br/><br/>
                {this.activeItem().crafting_station.map((crafting_station, i) => {
                    return ( <CraftingStationCard key={i} crafting_station={crafting_station}/> )
                  })}
              </Grid>
              <Grid item className={classes.griditem} xs={4}>
                Item<br/><br/>
                <MainCard item={this.state.activeItemNumber} />
              </Grid>
              <Grid item className={classes.griditem} xs={4}>
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
