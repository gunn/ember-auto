var attr = Ember.attr;

module("Ember.auto.VERSION");

test("the version number is set", function() {
  expect(2);

  var type = typeof Ember.auto.VERSION;
  equal(type, "string", "Ember.auto.VERSION should be a string");

  ok(Ember.auto.VERSION.match(/^\d+\.\d+\.\d+/), "it's in standard versio  number form");
});
