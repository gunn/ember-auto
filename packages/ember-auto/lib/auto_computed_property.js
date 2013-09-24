Ember.AutoProperty = function() {
  var cp = Ember.computed.apply(Ember, arguments);
  cp._isAutoProperty = true;

  return cp;
};
