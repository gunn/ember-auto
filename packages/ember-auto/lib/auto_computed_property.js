var argumentNamesFor = function(func) {
  var FN_ARGS        = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
  var FN_ARG_SPLIT   = /,/;
  var FN_ARG         = /^\s*(_?)(\S+?)\1\s*$/;
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

  var argNames = [];

  if (func.length) {
    var fnText  = func.toString().replace(STRIP_COMMENTS, '');
    var argDecl = fnText.match(FN_ARGS);
    (argDecl[1].split(FN_ARG_SPLIT)).forEach(function(arg) {
      arg.replace(FN_ARG, function(all, underscore, name){
        argNames.push(name);
      });
    });
  }

  return argNames;
};

Ember.AutoProperty = function(func, opts) {
  var cp = new Ember.ComputedProperty(func, opts);

  if (!cp._dependentKeys) {
    var keys = argumentNamesFor(cp.func);

    if (keys.length) {
      cp._dependentKeys = keys;
    }
  }

  cp._isAutoProperty = true;
  return cp;
};
