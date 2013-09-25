require("ember-auto/auto_computed_property");

Ember.auto = function (func) {
  var a_slice = [].slice;
  var args;

  if (arguments.length > 1) {
    args = a_slice.call(arguments, 0, -1);
    func = a_slice.call(arguments, -1)[0];
  }

  if (typeof func !== "function") {
    throw new Error("Computed Property declared without a property function");
  }

  var cp = new Ember.AutoProperty(func);
  if (args) cp.property.apply(cp, args);

  return cp;
};

require("ember-auto/version");
require("ember-auto/computed_property_extensions");
require("ember-auto/function_extensions");
