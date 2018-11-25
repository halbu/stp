#!/usr/bin/env python
#
# recipe parser
#

import json
import os
import xml.etree.ElementTree

recipes = []
recipe_index_tracking_dict = {} #this is bad
parsed = []
counter = 0

def main():
  files = os.listdir('./data')
  for myfile in files:
    parse_into_recipes(myfile)
  f = open("ui/src/assets/output.json", "w")
  f.write(json.dumps(recipes))

def parse_into_recipes(myfile):
  global counter
  if myfile == "ingots.xml":
    return
  print(myfile)

  e = xml.etree.ElementTree.parse('./data/' + myfile).getroot()
  station = ''

  for child in e:
    station = child.tag[:-7]

  for recipe_data in e.findall('.//RecipeData'):
    recipe = {}
    item_name = recipe_data[0].text

    recipe['item_name'] = item_name
    recipe['index_value'] = counter
    recipe['stations'] = {}

    # get ingredients and environmental conditions
    station_recipe = {}
    station_recipe['ingredients'] = []
    station_recipe['conditions'] = {}

    for c in recipe_data[1]:
      ingredient = {}

      if "Temperature" in c.tag or "Pressure" in c.tag:
        station_recipe['conditions'][c.tag] = {}
        for i in c:
          station_recipe['conditions'][c.tag][i.tag] = i.text
      else:
        ingredient[c.tag] = c.text
        if c.text is not "0":
          station_recipe['ingredients'].append(ingredient)

    # hacky custom sort - sort Time and Energy ingredients to the top of the
    # ingredient array so that they will always appear first in the UI
    station_recipe['ingredients'].sort(key=lambda tup: custom_sort_func(list(tup.keys())[0]))
        
    # if this item_name doesn't already exist in the item_name list, add it to
    # the parsed array and increment the counter
    if item_name not in parsed:
      recipes.append(recipe)
      recipe_index_tracking_dict[item_name] = counter
      parsed.append(item_name)
      counter += 1

    rec_index = recipe_index_tracking_dict[item_name]

    if station not in recipes[rec_index]['stations']:
      recipes[rec_index]['stations'][station] = []

    recipes[rec_index]['stations'][station].append(station_recipe)

def custom_sort_func(item):
    custom_sort_order = ["Time", "Energy"]
    if item in custom_sort_order:
      return custom_sort_order.index(item)
    else:
      return 99

if __name__ == '__main__':
  main()