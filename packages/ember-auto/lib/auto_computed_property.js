Ember.AutoProperty = function(func) {
  var cp = new Ember.ComputedProperty();
  cp._isAutoProperty = true;

  return cp;
};
