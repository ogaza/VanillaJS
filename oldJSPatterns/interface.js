var Interface = function (name, methods) {
  if (arguments.length !== 2) {
    throw new Error(
      "Interface constructor must be called with " + "2 parameters exactly"
    );
  }

  this.name = name;
  this.methods = [];

  for (var i = 0, len = methods.length; i < len; i++) {
    if (typeof methods[i] !== "string") {
      throw new Error(
        "interface constructor expects method names " + "to be strings"
      );
    }
    this.methods.push(methods[i]);
  }
};

// static class method
Interface.ensureImplements = function (object) {
  if (arguments.length < 2) {
    throw new Error(
      "ensureImplements must be invoked with " + "at least two params"
    );
  }

  for (var i = 1, len = arguments.length; i < len; i++) {
    var interface = arguments[i];

    if (interface.constructor !== Interface) {
      throw new Error(
        "ensureImplements expect arguments two and abowe " +
          "to be instances of Interface"
      );
    }

    for (
      var j = 0, methodsLen = interface.methods.length;
      j < methodsLen;
      j++
    ) {
      var method = interface.methods[j];
      if (!object[method] || typeof object[method] !== "function") {
        throw new Error(
          "object does not implement " +
            interface.name +
            " interface.Method " +
            method +
            " was not found"
        );
      }
    }
  }
};

/*
//example:

// create new interface
var DynamicMap = new Interface('DynamicMap', ['centerOnPoint', 'zoom', 'draw']);

// creat class that implements it:
var ExampleMap = function() { // implements DynamicMap
        
    this.centerOnPoint = function() {
        //...
    };
    this.zoom = function() {
        //...
    };
    this.draw = function() {
        //...
    };
};

var mapInstance = new ExampleMap();

Intercace.ensureImplements(mapInstance, DynamicMap);
*/
