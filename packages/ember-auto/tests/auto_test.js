module("auto properties");

test("get dependent keys from the function unless provided explicitly", function() {
  expect(3);

  var p1 = Ember.auto(function () {});
  var p2 = Ember.auto(function (a, b, c) {});
  var p3 = Ember.auto("X", "Y", function (a, b, c) {});

  deepEqual(p1._dependentKeys, undefined);
  deepEqual(p2._dependentKeys, ["a", "b", "c"]);
  deepEqual(p3._dependentKeys, ["X", "Y"]);
});
