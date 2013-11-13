var attrSet,
  __hasProp = {}.hasOwnProperty;

attrSet = function(handlebarsId, template, attrSets, attrLogic) {
  var that;
  that = this;
  check(template, Match.ObjectIncluding({
    "in": String
  }));
  check(handlebarsId, String);
  check(attrSets, Object);
  check(attrLogic, Function);
  return Template[template["in"]][handlebarsId] = function() {
    attrSet = attrLogic.call(that);
    if (attrSets.hasOwnProperty(attrProfile)) {
      return attrSets[attrProfile];
    } else {
      throw new Error("Attribute set " + attrSet + " isn't specified for " + handlebarsId);
    }
  };
};

Handlebars.registerHelper('attrSet', function(attrSet) {
  var fullAttrString, genAttrString, key, val;
  fullAttrString = '';
  genAttrString = function(key, val) {
    var vals;
    if (Match.test(val, Array)) {
      vals = val.join(' ');
      return "" + key + "='" + vals + "' ";
    } else if (Match.test(val, String)) {
      return "" + key + "='" + val + "' ";
    }
  };
  check(attrSet, Object);
  for (key in attrSet) {
    if (!__hasProp.call(attrSet, key)) continue;
    val = attrSet[key];
    fullAttrString += genAttrString(key, val);
  }
  return fullAttrString;
});
