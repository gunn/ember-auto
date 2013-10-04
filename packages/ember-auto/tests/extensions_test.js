module("Ember.computed and Function extensions");

var get = Ember.get;

test("calling auto on a function creates an auto property", function() {
  expect(1);
  var Person = Ember.Object.extend({
    full: function(first, last) {
      return first + " " + last;
    }.auto("first", "last")
  });

  var obj = Person.create({first: "Arthur", last: "Gunn"});
  equal(get(obj, "full"), "Arthur Gunn", "properties are injected as arguments");
});

test("calling auto on a computed property creates an auto property", function() {
  expect(2);
  var Person = Ember.Object.extend({
    full1: function(first, last) {
      return first + " " + last;
    }.property().auto("first", "last"),

    full2: Ember.computed(function(first, last) {
      return first + " " + last;
    }).auto("first", "last")
  });

  var obj = Person.create({first: "Arthur", last: "Gunn"});
  equal(get(obj, "full1"), "Arthur Gunn", "properties are injected as arguments");
  equal(get(obj, "full2"), "Arthur Gunn", "properties are injected as arguments");
});

test("dependent keys can be specified", function () {
  expect(3);

  var list = function (a, b, c, d) { return [].slice.call(arguments); };
  var nums = Ember.Object.extend({
    a: 1, b: 2, c: 3, d: 4,

    list1: list.auto("a", "b", "c", "d"),
    list2: list.auto("a", "b"),
    list3: list.auto("d", "b", "c")
  }).create();

  deepEqual(get(nums, "list1"), [1, 2, 3, 4]);
  deepEqual(get(nums, "list2"), [1, 2], "arguments that don't map to dependent keys are injected as undefined");
  deepEqual(get(nums, "list3"), [4, 2, 3], "works with any order of dependent keys");
});

test(".auto can be used to specify keys on computed properties, .property on auto properties", function () {
  expect(4);

  var list = function (a, b, c, d) { return [].slice.call(arguments); };
  var nums = Ember.Object.extend({
    a: 1, b: 2, c: 3, d: 4,

    list1: Ember.computed(list).auto("c", "b"),
    list2: Ember.auto(list).property("c", "b"),
    list3: list.property().auto("c", "b"),
    list4: list.auto().property("c", "b")
  }).create();

  deepEqual(get(nums, "list1"), [3, 2], ".auto specifying keys on a computed property");
  deepEqual(get(nums, "list2"), [3, 2], ".property specifying keys on an auto property");
  deepEqual(get(nums, "list3"), [3, 2], ".auto specifying keys after a .property");
  deepEqual(get(nums, "list4"), [3, 2], ".property specifying keys after a .auto");
});
