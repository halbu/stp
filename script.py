#!/usr/bin/env python
#
# recipe parser
#

import json
import os
import xml.etree.ElementTree

recipes = []
recipe_dict = {} #this is bad
parsed = []
counter = 0

def main():
  files = os.listdir('./data')
  for myfile in files:
    parse_into_recipes(myfile)
  f = open("ui/src/assets/output.json", "w")
  f.write(json.dumps(recipes))

def parse_into_recipes(myfile):
  global counter # ugh
  print(myfile)

  e = xml.etree.ElementTree.parse('./data/' + myfile).getroot()
  station = ''

  for child in e:
    station = child.tag[:-7]

  for recipe_data in e.findall('.//RecipeData'):
    recipe = {}
    recipe_name = recipe_data[0].text

    recipe['recipe_name'] = recipe_name
    recipe['index_value'] = counter
    recipe['stations'] = {}

    station_recipe = {}
    station_recipe['ingredients'] = []
    station_recipe['conditions'] = {}

    for c in recipe_data[1]:
      ingredient = {}

      if "Temperature" in c.tag or "Pressure" in c.tag:
        print(recipe_name)
        station_recipe['conditions'][c.tag] = {}
        for i in c:
          station_recipe['conditions'][c.tag][i.tag] = i.text
      else:
        ingredient[c.tag] = c.text
        if c.text is not "0":
          station_recipe['ingredients'].append(ingredient)
        
    if recipe_name not in parsed:
      recipes.append(recipe)
      recipe_dict[recipe_name] = counter
      parsed.append(recipe_name)
      counter += 1

    if station not in recipes[recipe_dict[recipe_name]]['stations']:
      recipes[recipe_dict[recipe_name]]['stations'][station] = []

    recipes[recipe_dict[recipe_name]]['stations'][station].append(station_recipe)


if __name__ == '__main__':
  main()