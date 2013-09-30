var a_slice  = [].slice;

Ember.ComputedProperty.prototype.auto = function() {
  var ap = new Ember.AutoProperty(this.func, {
    cacheable     : this._cacheable,
    dependentKeys : this._dependentKeys,
    readOnly      : this._readOnly
  });

  return ap;
};
