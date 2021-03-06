import React, { Component } from 'react';
import './App.css';
import recipes from './assets/output.json';
import { withStyles } from '@material-ui/core/styles';
import MainCard from './main-card/Main-Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from 'react-select';
import IngredientCard from './ingredient-card/Ingredient-Card';
import ConditionCard from './condition-card/Condition-Card';
import CraftingStationCard from './crafting-station-card/Crafting-Station-Card';

const styles = (theme) => ({
  cardcontainer: {
    marginTop: 10,
  },
  searchbox: {
    width: 700,
  },
  selectdiv: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 50,
    textAlign: 'center',
  },
  titlediv: {
    color: '#fff',
    marginTop: 20,
    marginBottom: 40,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItemNumber: 0,
      activeStationNumber: 0,
      options: [],
      selectedOption: null,
      history: [], // TODO back button or something
    };

    // this could definitely be less ugly
    for (var i=0; i!==recipes.length; ++i) {
      this.state.options.push({
        label: recipes[i].item_name, value: recipes[i].index_value
      });
    }
  }

  findNameByIndex(indexValue) {
    return recipes[indexValue].item_name;
  }

  componentDidMount() {
    this.handleChange({value: 119});
  }

  handleChange (selectedOption) {
    this.state.history.push(this.state.activeItemNumber);
    this.setState({ activeItemNumber: selectedOption.value, activeStationNumber: 0 });
  }

  activeItem() {
    return recipes[this.state.activeItemNumber];
  }

  recipesForActiveStation() {
    return this.activeItem().stations[Object.keys(this.activeItem().stations)[this.state.activeStationNumber]];
  }

  handleStationChange = (newStationNumber) => {
    this.setState({activeStationNumber: newStationNumber});
  }

  previousRecipeName() {
    if (this.state.history.length < 1) {
      return 'No previous recipe';
    } else {
      var previousRecipeIndex = this.state.history[this.state.history.length - 1];
      return recipes[previousRecipeIndex].item_name;
    }
  }

  render() {
    const { classes } = this.props;
    const { selectedOption } = this.state;

    return (
      <div className="App">
        <header className="App-header">
        
          {/* upper section - title and search field */}
          <div style={{backgroundColor: '#606060', width: '100%'}}>
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
          </div>

          {/* info section - cards and headings */}
          <div style={{ maxWidth: 1000 }}>
            <Grid container className={classes.cardcontainer} direction="row" spacing={40}>

              <Grid item className={classes.griditem} xs={4}>
                Item<br/><br/>
                <MainCard item={this.state.activeItemNumber} />
              </Grid>

              <Grid item className={classes.griditem} xs={4}>
                Crafted In<br/><br/>
                {Object.keys(this.activeItem().stations).map((station, i) => {
                  return ( <CraftingStationCard key={i} myIndexValue={i}
                    myColor={(i===this.state.activeStationNumber)?'#d0d0ff':'#e8e8e8'}
                    crafting_station={station} onSelectItem={this.handleStationChange}/> )
                })}
              </Grid>

              <Grid item className={classes.griditem} xs={4}>
                Requires<br/><br/>
                
                {/* pull ingredients/conditions separately. Only renders top recipe from stack for now */}
                {this.recipesForActiveStation()[0].ingredients.map((item, i) => {
                  return ( <IngredientCard key={i} item={item} /> )
                })}
                {Object.keys(this.recipesForActiveStation()[0].conditions).map((k, item) => {
                  return ( <ConditionCard key={item} cond={k} item={this.recipesForActiveStation()[0].conditions[k]} /> )
                })}
              </Grid>
            </Grid>
          </div>
        </header>
      </div>
    );
  }
}

export default withStyles(styles)(App);
