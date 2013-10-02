module("auto properties");

var get = Ember.get;


test("get dependent keys from the function unless provided explicitly", function() {
  expect(3);

  var p1 = Ember.auto(function () {});
  var p2 = Ember.auto(function (a, b, c) {});
  var p3 = Ember.auto("X", "Y", function (a, b, c) {});

  deepEqual(p1._dependentKeys, undefined);
  deepEqual(p2._dependentKeys, ["a", "b", "c"]);
  deepEqual(p3._dependentKeys, ["X", "Y"]);
});

test("the dependent key properties are injected into the function", function() {
  expect(2);

  var Person = Ember.Object.extend({
    full: Ember.auto(function(first, last) {
      return first + " " + last;
    })
  });

  var obj = Person.create({first: "Arthur", last: "Gunn"});
  equal(get(obj, "full"), "Arthur Gunn", "properties are injected as arguments");

  obj.set("first", "Attila the");
  equal(get(obj, "full"), "Attila the Gunn", "changed properties are injected as arguments");
});

test("arguments can be rearranged, skipped", function () {
  var Numbers, nums;
  expect(4);

  Numbers = Ember.Object.extend({
    a: 1, b: 2, c: 3, d: 4,

    list1: Ember.auto(function (a, b, c, d) {
      return [].slice.call(arguments);
    }),
    list2: Ember.auto(function (a, b) {
      return [].slice.call(arguments);
    }),
    list3: Ember.auto(function (c, d, b) {
      return [].slice.call(arguments);
    }),
    list4: Ember.auto(function () {
      return [].slice.call(arguments);
    })
  });
  nums = Numbers.create();

  deepEqual(get(nums, "list1"), [1, 2, 3, 4]);
  deepEqual(get(nums, "list2"), [1, 2], "works with fewer arguments");
  deepEqual(get(nums, "list3"), [3, 4, 2], "works with any order of arguments");
  deepEqual(get(nums, "list4"), [], "works with no arguments");
});

test("if dependent keys are specified, only their properties will be injected", function () {
  var Numbers, nums, list;
  expect(3);

  list = function (a, b, c, d) {
    return [].slice.call(arguments);
  };

  Numbers = Ember.Object.extend({
    a: 1, b: 2, c: 3, d: 4,

    list1: Ember.auto("a", "b", "c", "d", list),
    list2: Ember.auto("a", "b", list),
    list3: Ember.auto("c", "d", "b", list)
  });
  nums = Numbers.create();

  deepEqual(get(nums, "list1"), [1, 2, 3, 4]);
  deepEqual(get(nums, "list2"), [1, 2, undefined, undefined], "arguments that don't map to dependent keys are injected as undefined");
  deepEqual(get(nums, "list3"), [undefined, 2, 3, 4], "works with any order of dependent keys");
});
