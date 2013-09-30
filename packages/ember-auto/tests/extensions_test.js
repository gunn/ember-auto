module("Ember.computed and Function extensions");

var get = Ember.get;

test("calling auto on a function creates an auto property", function() {
  expect(1);
  var Person = Ember.Object.extend({
    full: function(first, last) {
      return first + " " + last;
    }.auto()
  });

  var obj = Person.create({first: "Arthur", last: "Gunn!"});
  equal(get(obj, "full"), "Arthur Gunn!", "properties are passed as arguments");
});
