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

test("the dependent key properties are passed into the function", function() {
  expect(1);

  var Person = Ember.Object.extend({
    full: Ember.auto(function(first, last) {
      return first + " " + last;
    })
  });

  var obj = Person.create({first: "Arthur", last: "Gunn"});
  equal(obj.get("full"), "Arthur Gunn", "properties are passed as arguments");

  obj.set("first", "Attila the");
  equal(obj.get("full"), "Attila the Gunn", "changed properties are passed as arguments");
});

test("argument orders can be rearranged, skipped", function () {
  var Numbers = Ember.Object.create({
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6,

    list: Ember.auto(function (a, b, c, d, e, f) {
      return [a, b, c, d, e, f];
    })
  });

  var num = Numbers.create();

  deepEqual(num.get("list"), [1,2,3,4,5,6]);
});
