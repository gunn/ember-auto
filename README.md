# Ember Auto [![Build Status](https://travis-ci.org/gunn/ember-auto.png?branch=master)](https://travis-ci.org/gunn/ember-auto)

If you've used ember for a while, you'll be tired of writing `this.get("property")` everywhere in your code. E.g. from emberjs.com:

```javascript
gravatarUrl: function() {
  var email = this.get('email'),
      size = this.get('size');

  return 'http://www.gravatar.com/avatar/' + hex_md5(email) + '?s=' + size;
}.property('email', 'size')
```

Wouldn't it be nice if instead of using strings to reference properties, they were just regular function arguments?


## The Ember Auto Way
```javascript
gravatarUrl: function(email, size) {
  return 'http://www.gravatar.com/avatar/' + hex_md5(email) + '?s=' + size;
}.auto("email", "size")
```
Or in coffeescript:

```coffeescript
gravatarUrl: Em.Auto "email", "size", (email, size)->
  'http://www.gravatar.com/avatar/' + hex_md5(email) + '?s=' + size;
```


## Use It
Just include ember-auto.js however you like:
```html
<script type="text/javascript" src="ember.js"></script>
<script type="text/javascript" src="ember-auto.js"></script>
```

## Is It Good?
Yes.


## How Does it Work?
Ember Auto works by injecting the property's keys into it's function so you can use them like normal arguments:

```javascript
var Person = Em.Object.extend({
  firstName: "Richard",
  message: function (loadedAt, name) {
    return "Hi " + name + ", you've been here since " + loadedAt;
  }.auto("App.loadedAt", "firstName")
});
```

There are many ways to set the keys, if `func` is a function to turn into an auto property, these are all valid:

 - `Em.computed("prop.path", func).auto()`
 - `Em.auto("prop.path", func)`
 - `Em.auto(func).property("prop.path")`
 - `func.auto("prop.path")`
 - `func.property("prop.path").auto()`

## What about special keys?
Computed properties in ember can reference special keys like `.@auto` and `.[]`. The last non-special segment is what's passed through:

```javascript
var World = Em.Object.extend({
  continents: [
    { name: "Africa"      population: 1022234000 },
    { name: "America"     population: 934611000 },
    { name: "Antarctica"  population: 4490 },
    { name: "Australasia" population: 29127000 },
    { name: "Asia"        population: 4164252000 },
    { name: "Europe"      population: 738199000 }
  ],

  totalPopulation: function (continents) {
    return continents.reduce(function(total, c) {
      return total + c.population;
    }, 0);
  }.auto("continents.@each.population")
});
```
## Contribute
Ember Auto wants to stay light. If you think you can enhance it, please do! Improvements to this readme would be particularly appreciated.

Ember Auto uses [node.js](http://nodejs.org/) and [grunt](http://gruntjs.com/) as a build system, these two libraries will need to be installed before starting.

### Setup
```bash
git clone https://github.com/gunn/ember-auto.git
cd ember-auto
npm install
```

### Build Ember Auto
```bash
grunt
```
Unminified and minified builds will be placed in the `dist` directory.

### Run Unit Tests
To setup:
```bash
npm install -g bower
npm install -g grunt-cli
bower install
```

Then run `grunt test` to execute the test suite headlessly via phantomjs, or `grunt develop` to run tests in a browser - tests are available at http://localhost:8000/tests
