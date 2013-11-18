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
@attrSet = (handlebarsId, template, attrSets, attrLogic) ->
  that = this
  _attrSets = {}

  # Validate inputs
  check template, Match.ObjectIncluding
    in: String
    namespace: Match.Optional String
  check handlebarsId, String
  check attrSets, Object
  check attrLogic, Function

  # Stringify all attribute sets now so we don't have to do it programmatically
  for own set, attrs of attrSets
    fullAttrString = ''
    fullAttrString += attrString attr, val for own attr, val of attrs
    _attrSets[set] = fullAttrString

  # Wrap sets and logic in a function
  func = ->
    activeAttrSet = attrLogic.call(that)
    if _attrSets.hasOwnProperty activeAttrSet
      return _attrSets[activeAttrSet]
    else
      throw new Error "Attribute set #{attrSet} isn't specified for #{handlebarsId}"

  # Add function to template
  if template.namespace?
    this[template.namespace][template.in][handlebarsId] = func
  else
    Template[template.in][handlebarsId] = func