module("auto properties");

var get = Ember.get;


test("only gets explicitly provided dependent keys", function() {
  expect(3);

  var p1 = Ember.auto(function () {});
  var p2 = Ember.auto(function (a, b, c) {});
  var p3 = Ember.auto("X", "Y", function (a, b, c) {});

  deepEqual(p1._dependentKeys, undefined);
  deepEqual(p2._dependentKeys, undefined);
  deepEqual(p3._dependentKeys, ["X", "Y"]);
});

test("the dependent key properties are injected into the function", function() {
  expect(2);

  var Person = Ember.Object.extend({
    full: Ember.auto("first", "last", function(first, last) {
      return first + " " + last;
    })
  });

  var obj = Person.create({first: "Arthur", last: "Gunn"});
  equal(get(obj, "full"), "Arthur Gunn", "properties are injected as arguments");

  obj.set("first", "Attila the");
  equal(get(obj, "full"), "Attila the Gunn", "changed properties are injected as arguments");
});

test("only the properties of provide keys will be injected, and in the order specified", function () {
  expect(3);

  var list = function (w, x, y, z) { return [].slice.call(arguments); };
  var nums = Ember.Object.extend({
    a: 1, b: 2, c: 3, d: 4,

    list1: Ember.auto("a", "b", "c", "d", list),
    list2: Ember.auto("a", "b", list),
    list3: Ember.auto("c", "d", "b", list)
  }).create();

  deepEqual(get(nums, "list1"), [1, 2, 3, 4]);
  deepEqual(get(nums, "list2"), [1, 2], "arguments that don't map to dependent keys are injected as undefined");
  deepEqual(get(nums, "list3"), [3, 4, 2], "works with any order of dependent keys");
});

test("dependent keys can point to other properties", function () {
  expect(2);

  var nums = Ember.Object.extend({
    a: 1, b: 2, c: 3, d: 4,

    ab: Ember.computed("a", "b", function() {
      return [this.get("a"), this.get("b")];
    }),
    cd: Ember.auto("c", "d", function(c, d) {
      return [c, d];
    }),

    list1: Ember.auto("ab", "cd", function(ab, cd) {
      return ab.concat(cd);
    }),
    list2: Ember.auto("ab", "c", "d", function(ab, c, d) {
      return ab.concat(c, d);
    })
  }).create();

  deepEqual(get(nums, "list1"), [1, 2, 3, 4], "computed and auto properties");
  deepEqual(get(nums, "list2"), [1, 2, 3, 4], "computed and regular properties");
});

test("can handle .[] and .@each special keys", function () {
  expect(2);

  var totalAccounts = function(accounts) {
    return accounts.reduce(function(total, account) {
      return total + account.amount;
    }, 0);
  };

  var obj = Ember.Object.extend({
    accounts: [
      { amount: 88 },
      { amount: 2600 },
      { amount: -3.141 },
      { amount: 2.013e3 },
    ],

    total1: Ember.auto("accounts.@each.amount", totalAccounts),
    total2: Ember.auto("accounts.[]", totalAccounts)
  }).create();

  equal(get(obj, "total1"), 4697.859, ".@each");
  equal(get(obj, "total2"), 4697.859, ".[]");
});

test("dependent keys can point to property paths with multiple steps", function () {
  expect(3);

  window.App = Ember.Object.create({
    currentElement: "Li"
  });

  var obj = Ember.Object.extend({
    elements: {
      "H":  { name: "Hydrogen", number: 1},
      "He": { name: "Helium",   number: 2},
      "Li": { name: "Lithium",  number: 3}
    },

    currentElement: Ember.auto("App.currentElement", function(currentElement) {
      return currentElement;
    }),
    lithium: Ember.auto("elements.Li.name", "elements.Li.number", function(name, number) {
      return name + ": "+ number;
    }),
    currentName: Ember.auto("elements", "App.currentElement", function(elements, currentElement) {
      return elements[currentElement].name;
    })
  }).create();

  deepEqual(get(obj, "currentElement"), "Li", "absolute paths");
  deepEqual(get(obj, "lithium"), "Lithium: 3", "long paths");
  deepEqual(get(obj, "currentName"), "Lithium", "mixed");
});

test("if multiple dependent keys have the same name, no problem!", function () {
  expect(3);

  window.App = Ember.Object.create({
    a: "App a",
    b: "App b"
  });

  var list = function (w, x, y, z) { return [].slice.call(arguments); };
  var obj = Ember.Object.extend({
    a: "obj a",
    b: "obj b",

    list1: Ember.auto("a", "b", "App.a", "App.b", list),
    list2: Ember.auto("App.a", "App.b", "a", "b", list),
    list3: Ember.auto("App.a", "a", "b", "App.b", list)
  }).create();

  deepEqual(get(obj, "list1"), ["obj a", "obj b", "App a", "App b"]);
  deepEqual(get(obj, "list2"), ["App a", "App b", "obj a", "obj b"]);
  deepEqual(get(obj, "list3"), ["App a", "obj a", "obj b", "App b"]);
});
