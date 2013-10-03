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


## Enter Ember Auto
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
Include ember-auto.js however you like:
```html
<script type="text/javascript" src="ember.js"></script>
<script type="text/javascript" src="ember-auto.js"></script>
```
And start cleaning up your code.


## Is It Good?
Yes.


## How Does it Work?
Ember Auto works by reading the arguments from the function definition to figure out how to pass properties in.
