# Add reactive HTML attributes to templates
# -----------------------------------------
# attrSet.call(this, ...)
attrSet = (handlebarsId, template, attrSets, attrLogic) ->
  that = this
  check template, Match.ObjectIncluding in: String
  check handlebarsId, String
  check attrSets, Object
  check attrLogic, Function

  Template[template.in][handlebarsId] = ->
    attrSet = attrLogic.call(that)
    if attrSets.hasOwnProperty attrProfile
      return attrSets[attrProfile]
    else
      throw new Error "Attribute set #{attrSet} isn't specified for #{handlebarsId}"


# Convert an object with array or string values into HTML attributes
# ------------------------------------------------------------------
# Removed the "default class" option, if you want to prepend a specific
# class onto the element's classes, you'll have to add it in the objects,
# perhaps have the class properties concat onto one with that class.
Handlebars.registerHelper 'attrSet', (attrSet) ->
  fullAttrString = ''
  genAttrString = (key, val) ->
    if Match.test val, Array
      vals = val.join ' '
      "#{key}='#{vals}' "
    else if Match.test val, String
      "#{key}='#{val}' "
  check attrSet, Object
  for own key, val of attrSet
    fullAttrString += genAttrString key, val
  return fullAttrString

