var _ = function(element) {
  var u = {
    // findWhere: iterate through array of objs, at each iteration, check if obj includes
    //  all the property names of supplied obj, && if each value mathes
    // if yes, return the object and stop iteration; else, return undefined
    matchObject: function(obj, suppliedObj) {
      let allfirstKeys = Object.getOwnPropertyNames(obj);
      let allSecKeys = Object.getOwnPropertyNames(suppliedObj);
      return allSecKeys.every(key => {
        return allfirstKeys.includes(key) && suppliedObj[key] === obj[key];
      });
    },
    findWhere: function(obj) {
      for (let idx = 0; idx < element.length; idx += 1) {
        if (this.matchObject(element[idx], obj)) {
          return element[idx];
        }
      }
    },

    where: function(suppliedObj) {
      return element.filter(obj => {
        return this.matchObject(obj, suppliedObj)
      });
    },

    pluck: function(suppliedKey) {
      let result = element.filter(obj => {
        return Object.prototype.hasOwnProperty.call(obj, suppliedKey);
      });

      return result.map(obj => {return obj[suppliedKey]});
    },

    keys: function() {
      return Object.getOwnPropertyNames(element);
    },

    values: function() {
      return Object.getOwnPropertyNames(element).map(prop => {
        return element[prop];
      })
    },

    pick: function(...props) {
      let result = {};
      props.forEach(prop => {
        if (Object.prototype.hasOwnProperty.call(element, prop)) {
          result[prop] = element[prop];
        }
      })
      return result;
    },

    omit: function(...props) {
      let result = {};
      let oldObjProperties = Object.getOwnPropertyNames(element);
      oldObjProperties.forEach(oldProp => {
        if (!props.includes(oldProp)) {
          result[oldProp] = element[oldProp];
        }
      })
      return result;
    },

    has: function(prop) {
      return Object.prototype.hasOwnProperty.call(element, prop);
    },

  };

  (["isArray", "isObject", "isFunction", "isString", "isNumber", "isBoolean", "_isElement"]).forEach(method => {
    u[method] = _[method].bind(u, element);
  });

  return u;

};



_.extend = function(...objs) {
  for (let idx = objs.length - 1; idx > 0; idx -= 1) {
    Object.assign(objs[idx - 1], objs[idx]);
  }
  return objs[0];
};

_.isArray = function(arr) {
  return toString.call(arr) === "[object Array]" || Array.isArray(arr);
};

_.isObject = function(arg) {
  return typeof arg === "function" || typeof arg === "object";
};

_.isFunction = function(func) {
  return typeof func === "function";
};

_.isString = function(str) {
  return typeof str === "string" || str.constructor === String;
};

_.isNumber = function(num) {
  return typeof num === 'number' || num.constructor === Number;
};

_.isBoolean = function(boo) {
  return typeof boo === "boolean" || boo.constructor === Boolean;
};

_.isElement = function(obj) {
  return obj && obj.nodeType === 1;
};



// test for utility methods
//console.log(_.isArray([]));  // true
//console.log(_.isArray({a:1}));  // false
//console.log(_.isObject({}));  // true
function greet() {};
//console.log(_.isObject([]));  // true
//console.log(_(greet).isObject());  // true
//console.log(_.isFunction(greet));    // true
//console.log(_('a').isFunction());    // false
//console.log(_.isString('abc'));     // true
//console.log(_(12).isString());     // false
let b = new Number(5);
//console.log(_.isNumber(12));   // true
//console.log(_(b).isNumber()) ; // true
console.log(_.isBoolean(34));    // false
let c = new Boolean(true);
console.log(_(c).isBoolean());   // true

console.log(typeof _["isBoolean"] === "function" ); // true
console.log(typeof _()["isBoolean"] === "function"); // true






