var App = App || {};

App.ExtendableClass = function (options) {
  //$.extend(this, options);
};

App.ExtendableClass.extend = function (newProperties) {
  var parent = this;
  // The constructor function for the new subclass is defaulted
  // to simply call the parent's constructor.
  var child = function () {
    return parent.apply(this, arguments);
  };
  // Copy all of the properties in the parent object over
  // to the destination object
  $.extend(child, parent);
  // Set the prototype chain to inherit from parent, without calling
  // parent's constructor function.
  var Surrogate = function () {
    this.constructor = child;
  };
  Surrogate.prototype = parent.prototype;

  child.prototype = new Surrogate();
  // Add prototype properties (instance properties) to the subclass,
  if (newProperties) $.extend(child.prototype, newProperties);
  // Set a convenience property in case the parent's prototype is needed
  // later.
  child.__super__ = parent.prototype;

  return child;
};

// to create a sub class:
// var SubClass = App.ExtendableClass.extend({ prop1: 'value1' });
// to create ist instance:
// var subClassInstance = new SubClass();
// to create a sub sub class
// var SubSubClass = SubClass.extend({ prop2: 'value2' });
// to create ist instance:
// var subSubClassInstance = new SubSubClass();

(function (mediator, $) {
  mediator.Mediator = App.ExtendableClass.extend({
    internalCallbacks: $.Callbacks(),
    callbacksCount: 0,

    callHandlers: function (args) {
      // arguments must be an array
      this.internalCallbacks.fire.apply(this.internalCallbacks, args);
    },
    addHandler: function (handler) {
      this.internalCallbacks.add(handler);
      this.callbacksCount++;
    },
    removeHandler: function (handler) {
      this.internalCallbacks.remove(handler);
      this.callbacksCount--;
    }
  });
})((App.Mediators = App.Mediators || {}), jQuery);
