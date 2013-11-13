# Convert attribute to string
# ---------------------------
attrString = (key, val) ->
  if Match.test val, Array
    vals = val.join ' '
    "#{key}='#{vals}' "
  else if Match.test val, String
    "#{key}='#{val}' "


# Add reactive HTML attributes to templates
# -----------------------------------------
# attrSet.call(this, ...)
attrSet = (handlebarsId, template, attrSets, attrLogic) ->
  that = this

  # Validate inputs
  check template, Match.ObjectIncluding in: String
  check handlebarsId, String
  check attrSets, Object
  check attrLogic, Function

  # Stringify all attribute sets now so we don't have to do it programmatically
  for own set, attrs of attrSets
    fullAttrString = ''
    fullAttrString += attrString attr, val for own attr, val of attrs
    attrSets[set] = fullAttrString

  Template[template.in][handlebarsId] = ->
    attrSet = attrLogic.call(that)
    if attrSets.hasOwnProperty attrSet
      return attrSets[attrSet]
    else
      throw new Error "Attribute set #{attrSet} isn't specified for #{handlebarsId}"