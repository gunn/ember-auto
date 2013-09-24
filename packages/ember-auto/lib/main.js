require("ember-auto/auto_computed_property");

Ember.auto = function (func) {
  return autoComputed(func);
};

require("ember-auto/version");
require("ember-auto/computed_property_extensions");
require("ember-auto/function_extensions");
