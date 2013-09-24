module("Ember.auto.VERSION");

test("the version number is set", function() {
  expect(2);

  ok(Ember.auto.VERSION, "it's defined");
  ok(Ember.auto.VERSION.match(/^\d+\.\d+\.\d+\w*$/), "it's in standard version number form");
});
