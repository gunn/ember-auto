module("Ember.auto");

test("Regular computed properties are not auto", function() {
  expect(2);

  var property1 = Ember.computed(function () {});
  var property2 = function () {}.property();

  ok(!property1._isAutoProperty, "Ember.computed does not create an auto property");
  ok(!property2._isAutoProperty, "func.property() does not create an auto property");
});

test("Ember.auto creates auto properties", function() {
  var property = Ember.auto(function () {});
  ok(property._isAutoProperty, "Ember.auto creates an auto property");
});

test("auto properties are computed properties", function() {
  expect(3);

  var property = Ember.auto(function () {});
  ok(property.cacheable, "an auto property is a computed property");
  ok(property.volatile,  "an auto property is a computed property");
  ok(property.readOnly,  "an auto property is a computed property");
});
