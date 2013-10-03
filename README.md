# Ember Auto [![Build Status](https://travis-ci.org/gunn/ember-auto.png?branch=master)](https://travis-ci.org/gunn/ember-auto)

If you've used ember for a while, you'll be tired of writing `this.get("property")` everywhere in your code. E.g. from emberjs.com:

```javascript
gravatarUrl: function() {
  var email = this.get('email'),
      size = this.get('size');

  return 'http://www.gravatar.com/avatar/' + hex_md5(email) + '?s=' + size;
}.property('email', 'size')
```

Wouldn't it be nice if instead of using strings to reference properties, they were just  regular function arguments?


## The Ember Auto Way
```javascript
gravatarUrl: function(email, size) {
  return 'http://www.gravatar.com/avatar/' + hex_md5(email) + '?s=' + size;
}.auto()
```
Or in coffeescript:

```coffeescript
gravatarUrl: Em.Auto (email, size)->
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
First you make a function an auto property by wrapping it with `Ember.auto`, or by calling `.auto()` on it.

Then Ember Auto works by reading the arguments from the function definition to figure out how to pass properties in. There are two main ways it decides what properties:

#### Implicitly
If all the properties are fields on the object, Ember auto can use the argument names:
```javascript
var Person = Em.Object.extend({
  first: "Richard",
  last:  "Feynman",
  fullName: function(first, last) {
    return first+" "+last;
  }.auto()
});
```

#### Explicitly
Otherwise you can set the properties however you like:
```javascript
Person.extend({
  message: function (fullName, loadedAt) {
    return "Hi " + fullName + ", you've been here since" + loadedAt;
  }.auto("App.loadedAt", "fullName")
});
```

There are many ways to set the properties, if `func` is a function to turn into an auto property, these are all valid:

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
