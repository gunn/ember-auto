module("auto properties");

test("get dependant keys from the function unless provided explicitly", function() {
  expect(2);

  var p1 = Ember.auto(function () {});
  var p2 = Ember.auto(function (a, b, c) {});
  var p3 = Ember.auto("X", "Y", function (a, b, c) {});

  equal(p1._dependentKeys, []);
  equal(p2._dependentKeys, ["a", "b", "c"]);
  equal(p3._dependentKeys, ["X", "Y"]);
});
