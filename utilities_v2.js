/*
Note: the `_` variable defined in this programme should work like the Jquery variable `$`,
      where the variable points to a function that accepts an element (can be an array, an object, an array of objects, etc). 
      This function creates an object with methods that can then be used for dealing with the element.
*/

(function(){
  var matchObject = function(obj, suppliedObj) {
    let allfirstKeys = Object.getOwnPropertyNames(obj);
    let allSecKeys = Object.getOwnPropertyNames(suppliedObj);
    return allSecKeys.every(key => {
      return allfirstKeys.includes(key) && suppliedObj[key] === obj[key];
    });
  };


  var _ = function(element) {
    var u = {
      first: function() {
        return element[0]; 
      },

      last: function() {
        return element[element.length - 1];
      },

      without: function(...values) {
        return element.filter(item => {
        return !values.includes(item);
        });
      },

      lastIndexOf: function(value) {
        let lastIdx = -1;
        element.forEach((item, idx) => {
          if (item === value) {
            lastIdx = idx;
          }
        });

        return lastIdx;
      },

      sample: function(qty) {
        function getRandomInt(min, max) {
          min = Math.ceil(min);
          max = Math.floor(max);
          return Math.floor(Math.random() * (max - min) + min);
        }

        if (qty) {
          let result = [];

          for (let i = 1; i <= qty; i += 1 ) {
            let selectedItem = element[getRandomInt(0, element.length)];
            
            if (result.includes(selectedItem)) {
              i -= 1;
              continue;
            }
            else {
              result.push(selectedItem);
            }
          }

          return result;
        
        } else {
          return element[getRandomInt(0, element.length)];
        }
      },

      findWhere: function(obj) {
        for (let idx = 0; idx < element.length; idx += 1) {
          if (matchObject(element[idx], obj)) {
            return element[idx];
          }
        }
      },
  
      where: function(suppliedObj) {
        return element.filter(obj => {
          return matchObject(obj, suppliedObj)
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

    ([ "isElement" ,"isArray", "isObject", "isFunction", "isString", "isNumber", "isBoolean" ]).forEach(method => {
      u[method] = _[method].bind(u, element);
    });

    return u;
  };

  _.range = function(start, end) {
    let result = [];
    if (end) {
      for (let i = start; i < end; i += 1) {
        result.push(i);
      }
    } else {
      for (let i = 0; i < start; i += 1) {
        result.push(i);
      }
    }

    return result;
  };

  _.extend = function(...objs) {
    for (let idx = objs.length - 1; idx > 0; idx -= 1) {
      Object.assign(objs[idx - 1], objs[idx]);
    }
    return objs[0];
  };

  _.isElement = function(obj) {
    return obj && obj.nodeType === 1;
  }

  _.isArray = function(arr) {
    return toString.call(arr) === "[object Array]" || Array.isArray(arr);
  };

  _.isObject = function(arg) {
    return typeof arg === "function" || typeof arg === "object" && !!arg;
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

 

  window._ = _;
})();





// tests
//console.log(_([1,2,3]).first()); // 1
//console.log(_([1,2,3]).last());  // 3
//console.log(_([1,2,3,4]).without(2)); // [1,3,4,]];
console.log(_.range(3));   // [0,1,2,3]
//console.log(_().range(1, 5));  // [1,2,3,4]
//console.log(_([1,2,3,8]).lastIndexOf()); // 3
//console.log(_([9,8,7,6]).sample()); // (random element) from [9,8,7,6]
//console.log(_([9,8,7,6]).sample(2));  // [8,9] (random 2 elements from [9,8,7,6])


