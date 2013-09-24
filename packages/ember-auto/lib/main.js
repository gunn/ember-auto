require("ember-auto/auto-computed-property");

Ember.auto = function (func) {
  return autoComputed(func);
};

require("ember-auto/version");
require("ember-auto/computed-property-extensions");
require("ember-auto/macro");
