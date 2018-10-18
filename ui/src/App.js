import React, { Component } from 'react';
import './App.css';
import recipes from '../src/assets/output.json';
import { withStyles } from '@material-ui/core/styles';
import MainCard from './main-card/Main-Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import IngredientCard from './ingredient-card/Ingredient-Card';
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
      activeItemNumber: 179,
      activeStationNumber: 0,
      options: [],
      selectedOption: null,
      history: [], // TODO back button or something
    };

    // this could definitely be less ugly
    for (var i=0; i!==recipes.length; ++i) {
      this.state.options.push({
        label: recipes[i].recipe_name, value: recipes[i].index_value
      });
    }
  }

  findNameByIndex(indexValue) {
    return recipes[indexValue].recipe_name;
  }

  componentDidMount() {
    this.handleChange( {value: 88});
  }

  handleChange (selectedOption) {
    this.setState({ activeItemNumber: selectedOption.value });
  }

  activeItem() {
    return recipes[this.state.activeItemNumber];
  }

  handleStationChange = (newStationNumber) => {
    this.state.history.push(this.state.activeStationNumber);
    this.setState({activeStationNumber: newStationNumber});
  }

  previousRecipeName() {
    if (this.state.history.length < 1) {
      return 'No previous recipe';
    } else {
      var previousRecipeIndex = this.state.history[this.state.history.length - 1];
      return recipes[previousRecipeIndex].recipe_name;
    }
  }

  render() {
    const { classes } = this.props;
    const { selectedOption } = this.state;

    console.log(this.activeItem());
    console.log(this.activeItem().stations);
    console.log(this.activeItem().stations[Object.keys(this.activeItem().stations)[0]]);
    console.log('active station number: ' + this.state.activeStationNumber);

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

            <Grid container className={classes.cardcontainer} direction="row" spacing={40}>

              <Grid item className={classes.griditem} xs={4}>
                Item<br/><br/>
                <MainCard item={this.state.activeItemNumber} />
              </Grid>

              <Grid item className={classes.griditem} xs={4}>
                Crafting Station(s)<br/><br/>
                {Object.keys(this.activeItem().stations).map((station, i) => {
                  return ( <CraftingStationCard key={i} myIndexValue={i} crafting_station={station} onSelectItem={this.handleStationChange}/> )
                })}
              </Grid>

              <Grid item className={classes.griditem} xs={4}>
                Requirements<br/><br/>
                {this.activeItem().stations[Object.keys(this.activeItem().stations)[this.state.activeStationNumber]].ingredients.map((item, i) => {
                    return ( <IngredientCard key={i} item={item} /> )
                  })}
              </Grid>

          </Grid>
        </header>
      </div>
    );
  }
}

export default withStyles(styles)(App);
