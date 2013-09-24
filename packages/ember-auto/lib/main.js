require("ember-auto/auto_computed_property");

Ember.auto = function () {
  return Ember.AutoProperty.apply(Ember, arguments);
};

require("ember-auto/version");
require("ember-auto/computed_property_extensions");
require("ember-auto/function_extensions");
