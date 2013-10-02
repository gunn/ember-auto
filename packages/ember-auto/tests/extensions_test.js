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

test("dependent keys can be specified", function () {
  var Numbers, nums;
  expect(3);

  Numbers = Ember.Object.extend({
    a: 1, b: 2, c: 3, d: 4,

    list1: function (a, b, c, d) {
      return [].slice.call(arguments);
    }.auto("a", "b", "c", "d"),
    list2: function (a, b, c, d) {
      return [].slice.call(arguments);
    }.auto("a", "b"),
    list3: function (a, b, c, d) {
      return [].slice.call(arguments);
    }.auto("d", "b", "c")
  });
  nums = Numbers.create();

  deepEqual(get(nums, "list1"), [1, 2, 3, 4]);
  deepEqual(get(nums, "list2"), [1, 2, undefined, undefined], "arguments that don't map to dependent keys are injected as undefined");
  deepEqual(get(nums, "list3"), [undefined, 2, 3, 4], "works with any order of dependent keys");
});