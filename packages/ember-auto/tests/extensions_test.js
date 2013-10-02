module("Ember.computed and Function extensions");

var get = Ember.get;

test("calling auto on a function creates an auto property", function() {
  expect(1);
  var Person = Ember.Object.extend({
    full: function(first, last) {
      return first + " " + last;
    }.auto()
  });

  var obj = Person.create({first: "Arthur", last: "Gunn"});
  equal(get(obj, "full"), "Arthur Gunn", "properties are injected as arguments");
});

test("calling auto on a computed property creates an auto property", function() {
  expect(2);
  var Person = Ember.Object.extend({
    full1: function(first, last) {
      return first + " " + last;
    }.property().auto(),

    full2: Ember.computed(function(first, last) {
      return first + " " + last;
    }).auto()
  });

  var obj = Person.create({first: "Arthur", last: "Gunn"});
  equal(get(obj, "full1"), "Arthur Gunn", "properties are injected as arguments");
  equal(get(obj, "full2"), "Arthur Gunn", "properties are injected as arguments");
});
