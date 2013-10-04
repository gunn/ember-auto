Ember.AutoProperty = function(func, opts) {
  var cp = new Ember.ComputedProperty(func, opts);
  cp._isAutoProperty = true;

  return cp;
};

Ember.ComputedProperty.prototype.get = function(obj, keyName) {
  var ret, cache, meta, chainNodes, args;

  if (this._cacheable) {
    meta  = metaFor(obj);
    cache = meta.cache;
    if (keyName in cache) { return cache[keyName]; }
  }

  if (this._isAutoProperty) {
    args = argumentsFor(obj, keyName, this);
  } else {
    args = [keyName];
  }

  if (this._cacheable) {
    ret        = cache[keyName] = this.func.apply(obj, args);
    chainNodes = meta.chainWatchers && meta.chainWatchers[keyName];
    if (chainNodes) { finishChains(chainNodes); }

    addDependentKeys(this, obj, keyName, meta);
  } else {
    ret = this.func.apply(obj, args);
  }

  return ret;
};

var get      = Ember.get,
    set      = Ember.set,
    metaFor  = Ember.meta,
    a_slice  = [].slice,
    o_create = Ember.create,
    META_KEY = Ember.META_KEY,
    watch    = Ember.watch,
    unwatch  = Ember.unwatch;

function keysForDep(depsMeta, depKey) {
  var keys = depsMeta[depKey];
  if (!keys) {
    // if there are no dependencies yet for a the given key
    // create a new empty list of dependencies for the key
    keys = depsMeta[depKey] = {};
  } else if (!depsMeta.hasOwnProperty(depKey)) {
    // otherwise if the dependency list is inherited from
    // a superclass, clone the hash
    keys = depsMeta[depKey] = o_create(keys);
  }
  return keys;
}

function metaForDeps(meta) {
  return keysForDep(meta, 'deps');
}

function addDependentKeys(desc, obj, keyName, meta) {
  // the descriptor has a list of dependent keys, so
  // add all of its dependent keys.
  var depKeys = desc._dependentKeys, depsMeta, idx, len, depKey, keys;
  if (!depKeys) return;

  depsMeta = metaForDeps(meta);

  for(idx = 0, len = depKeys.length; idx < len; idx++) {
    depKey = depKeys[idx];
    // Lookup keys meta for depKey
    keys = keysForDep(depsMeta, depKey);
    // Increment the number of times depKey depends on keyName.
    keys[keyName] = (keys[keyName] || 0) + 1;
    // Watch the depKey
    watch(obj, depKey);
  }
}

function removeDependentKeys(desc, obj, keyName, meta) {
  // the descriptor has a list of dependent keys, so
  // add all of its dependent keys.
  var depKeys = desc._dependentKeys, depsMeta, idx, len, depKey, keys;
  if (!depKeys) return;

  depsMeta = metaForDeps(meta);

  for(idx = 0, len = depKeys.length; idx < len; idx++) {
    depKey = depKeys[idx];
    // Lookup keys meta for depKey
    keys = keysForDep(depsMeta, depKey);
    // Increment the number of times depKey depends on keyName.
    keys[keyName] = (keys[keyName] || 0) - 1;
    // Watch the depKey
    unwatch(obj, depKey);
  }
}

function finishChains(chainNodes) {
  for (var i=0, l=chainNodes.length; i<l; i++) {
    chainNodes[i].didChange(null);
  }
}

var keysFor = function(dependentKeys) {
  var SPECIAL_KEY = /\.@each|\.\[\]/;
  var keys = [];
  var keySection, keyParts, argName;

  for (var i = 0; i < dependentKeys.length; i++) {
    keySection = dependentKeys[i].split(SPECIAL_KEY)[0];
    keys.push(keySection);
  }

  return keys;
};

var getWithGlobals = function (obj, path) {
  var base = Ember.isGlobalPath(path) ? Ember.lookup : obj;
  return get(base, path);
};

var argumentsFor = function(obj, keyName, property) {
  var key,
      keys = keysFor(property._dependentKeys || []),
      args = [];

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];

    if (key) {
      args.push(getWithGlobals(obj, key));
    } else {
      args.push(undefined);
    }
  }

  return args;
};
