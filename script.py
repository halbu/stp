#!/usr/bin/env python
#
# recipe parser
#

import json
import os
import xml.etree.ElementTree
import pprint

recipes = []
recipe_dict = {} #this is bad
parsed = []
counter = 0

def main():
  pp = pprint.PrettyPrinter(indent=2)
  files = os.listdir('./data')
  for myfile in files:
    parse_into_recipes(myfile)
  f = open("ui/src/assets/output.json", "w")
  print('Writing to file...')
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

    # recipe['stations'][station] = {}
    # recipe['stations'][station]['ingredients'] = []

    station_recipe = {}
    station_recipe['ingredients'] = []

    for c in recipe_data[1]:
      ingredient = {}
      ingredient[c.tag] = c.text
      if c.text is not "0":
        station_recipe['ingredients'].append(ingredient)
        
    if recipe_name not in parsed:
      recipes.append(recipe)
      recipe_dict[recipe_name] = counter # add a dict entry with this recipe's name and index number e.g. recipe_dict['ItemIronCrateKit'] = 1
      parsed.append(recipe_name)
      counter += 1

    recipes[recipe_dict[recipe_name]]['stations'][station] = station_recipe # honestly
    # else:
    #   recipe_number = recipe_dict[recipe_name]
    #   recipes[recipe_number]['stations'][station] = recipe

if __name__ == '__main__':
  main()