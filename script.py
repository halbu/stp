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
    recipe['recipe_name'] = recipe_data[0].text
    recipe['ingredients'] = []
    recipe['index_value'] = counter
    recipe['crafting_station'] = [station]
    for c in recipe_data[1]:
      ingredient = {}
      ingredient[c.tag] = c.text
      if c.text is not "0":
        recipe['ingredients'].append(ingredient)
        
    if recipe_data[0].text not in parsed:
      recipes.append(recipe)
      recipe_dict[recipe_data[0].text] = counter
      parsed.append(recipe_data[0].text)
      counter += 1
    else:
      recipe_number = recipe_dict[recipe_data[0].text]
      recipes[recipe_number]["crafting_station"].append(station)

if __name__ == '__main__':
  main()