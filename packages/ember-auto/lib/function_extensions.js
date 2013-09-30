Function.prototype.auto = function() {
  var ret = Ember.auto(this);
  if (arguments.length > 0) {
    ret.property.apply(ret, arguments);
  }

  return ret;
};
