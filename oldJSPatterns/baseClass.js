// to create a sub class:
// var SubClass = Class.extend({ prop1: 'value1' });
// to create ist instance:
// var subClassInstance = new SubClass();
// to create a sub sub class
// var SubSubClass = SubClass.extend({ prop2: 'value2' });
// to create ist instance:
// var subSubClassInstance = new SubSubClass();

(function () {
  var initializing = false,
    // in Chrome this test will pass hence the fnTest will
    // contain regex /\b_super\b/
    fnTest = /xyz/.test(function () {
      xyz;
    })
      ? /\b_super\b/
      : /.*/;

  // Define Class.
  // The base implementation (does nothing)
  this.Class = function () {};

  // Define "extend" method in the Class object
  // It creates a new object that inherits from the Class
  Class.extend = function (prop) {
    var _super = this.prototype;

    // Instantiate a base class (but only create the instance,
    // don't run the init method which makes the constructor's work)
    initializing = true;
    var prototype = new this();
    initializing = false;

    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] =
        typeof prop[name] == "function" &&
        typeof _super[name] == "function" &&
        fnTest.test(prop[name])
          ? (function (name, fn) {
              return function () {
                // store in tmp the super class object
                var tmp = this._super;

                // Add a new ._super() method to the object on which
                // that is the same method but on the super-class
                // this = object on which we actually execute the
                // the given method
                this._super = _super[name];

                // execute the actual method (fn = prop[name]), which
                // can access the method of the same name but in the
                // parent class using _super() syntax
                var ret = fn.apply(this, arguments);

                // The method only need to be bound temporarily, so we
                // remove it when we're done executing
                this._super = tmp;

                return ret;
              };
            })(name, prop[name])
          : prop[name];
    }
    // The dummy class constructor
    // function Class() {
    function SubClass() {
      // All construction is actually done in the init method
      if (!initializing && this.init) this.init.apply(this, arguments);
    }
    // Populate our constructed prototype object
    // Class.prototype = prototype;
    SubClass.prototype = prototype;

    // Enforce the constructor to be what we expect
    // Class.prototype.constructor = Class;
    SubClass.prototype.constructor = SubClass;

    // And make this class extendable
    // Class.extend = arguments.callee;
    SubClass.extend = arguments.callee;

    // return Class;
    return SubClass;
  };
})();

// below simple examples of classical inheritance implementations - just for exercise
(function () {
  var SubClass = Class.extend({
    age: 10,
    newMethod: function () {
      console.log("sub classe's method");
    }
  });

  var SubSubClass = SubClass.extend({
    newMethod: function () {
      this._super();
      console.log("sub sub classe's method");
    }
  });

  var subSubClass = new SubSubClass();

  subSubClass.newMethod();

  function Person(name) {
    this.name = name;
  }

  Person.prototype.getName = function () {
    console.log("getName from Person");
    return this.name;
  };

  Person.prototype.toString = function () {
    return "this is person " + this.getName();
  };

  function Author(name, books) {
    Person.call(this, name);
    this.books = books;
  }
  Author.prototype = new Person();
  Author.prototype.constructor = Author;

  Author.prototype.getBooks = function () {
    return this.books;
  };

  function extend(subClass, superClass) {
    var F = function () {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;

    subClass.superclass = superClass.prototype;
    if (superClass.prototype.constructor == Object.prototype.constructor) {
      superClass.prototype.constructor = superClass;
    }
  }

  function C1() {
    console.log("constructor c1");
  }

  C1.prototype.method = function () {
    console.log("method c1");
  };

  function C2() {
    C2.superclass.constructor.call(this);
    console.log("constructor c2");
  }

  extend(C2, C1);

  // override the base method
  C2.prototype.method = function () {
    C2.superclass.method.call(this);
    console.log("method c2");
  };

  var x = new C2();

  x.method();
})();

// below examples of prototypal inheritance implementations

/*
 * In prototypal inheritance, you simply create an object.
 * This object gets reused by new objects the way that prototype
 * chain work.
 *
 * the prototype object provides a prototype for what the other
 * objects should look like.
 */
(function () {
  function clone(object) {
    function F() {}
    F.prototype = object;
    return new F();
  }

  /* Person Prototype Object. */
  var Person = {
    name: "default name",
    getName: function () {
      return this.name;
    }
  };

  var reader = clone(Person);
  console.log(reader.name);

  reader.name = "John Smith";
  console.log(reader.name);
})();
