# Ember Auto [![Build Status](https://travis-ci.org/gunn/ember-auto.png?branch=master)](https://travis-ci.org/gunn/ember-auto)


## The Problem

If you've used ember for a while, you'll be tired of writing `this.get("property")` everywhere in your code. E.g. from emberjs.com:

```javascript
gravatarUrl: function() {
  var email = this.get('email'),
      size = this.get('size');

  return 'http://www.gravatar.com/avatar/' + hex_md5(email) + '?s=' + size;
}.property('email', 'size')
```

And coffeescript does little to help:

```coffeescript
gravatarUrl: (->
  email = @get('email')
  size = @get('size')

  'http://www.gravatar.com/avatar/' + hex_md5(email) + '?s=' + size;
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
