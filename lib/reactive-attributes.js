var attrString,
  __hasProp = {}.hasOwnProperty;

attrString = function(key, val) {
  var vals;
  if (Match.test(val, Array)) {
    vals = val.join(' ');
    return "" + key + "='" + vals + "' ";
  } else if (Match.test(val, String)) {
    return "" + key + "='" + val + "' ";
  }
};

this.attrSet = function(handlebarsId, template, attrSets, attrLogic) {
  var attr, attrs, fullAttrString, set, that, val;
  that = this;
  check(template, Match.ObjectIncluding({
    "in": String
  }));
  check(handlebarsId, String);
  check(attrSets, Object);
  check(attrLogic, Function);
  for (set in attrSets) {
    if (!__hasProp.call(attrSets, set)) continue;
    attrs = attrSets[set];
    fullAttrString = '';
    for (attr in attrs) {
      if (!__hasProp.call(attrs, attr)) continue;
      val = attrs[attr];
      fullAttrString += attrString(attr, val);
    }
    attrSets[set] = fullAttrString;
  }
  return Template[template["in"]][handlebarsId] = function() {
    var attrSet;
    attrSet = attrLogic.call(that);
    if (attrSets.hasOwnProperty(attrSet)) {
      return attrSets[attrSet];
    } else {
      throw new Error("Attribute set " + attrSet + " isn't specified for " + handlebarsId);
    }
  };
};
