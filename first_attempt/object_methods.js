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

  return u;
};

_.extend = function(...objs) {
  for (let idx = objs.length - 1; idx > 0; idx -= 1) {
    Object.assign(objs[idx - 1], objs[idx]);
  }
  return objs[0];
}




// array method tests
//console.log(_([1,2,3]).first()); // 1
//console.log(_([1,2,3]).last());  // 3
//console.log(_([1,2,3,4]).without(2)); // [1,3,4,]];
// console.log(_().range(3));   // [0,1,2,3]
//console.log(_().range(1, 5));  // [1,2,3,4]
//console.log(_([1,2,3,8]).lastIndexOf()); // 3
//console.log(_([9,8,7,6]).sample()); // (random element) from [9,8,7,6]
//console.log(_([9,8,7,6]).sample(2));  // [8,9] (random 2 elements from [9,8,7,6])

// object methods tests
//let dic = [{ foo: "bar", quux: "q", idx: 0 }, { foo: "baz", quux: "z", idx: 1 }, { foo: "bar", quux: "z", idx: 2 }];
//console.log(_(dic).findWhere({foo: "bar", quux: "z"}));  // { foo: 'bar', quux: 'z', idx: 2 }
//console.log(_(dic).findWhere({ foo: "bar" }));  // { foo: 'bar', quux: 'q', idx: 0 }
//console.log(_(dic).findWhere({ foo: "quux" }));  // undefined
//console.log(_(dic).where({foo: "bar"}));    // [ { foo: 'bar', quux: 'q', idx: 0 }, { foo: 'bar', quux: 'z', idx: 2 }]
//console.log(_(dic).where({foo: "bar", quux: "z"}));    // [ { foo: 'bar', quux: 'z', idx: 2 } ]
//console.log(_(dic).where({ foo: "quux" }));   // []
//let dic2 = [{foo: 'bar', alpha: 'ddd'}, {foo: 'baz'}];
//let dic3 = [{foo: 'bar'}, {xcc: 'baz'}];
//console.log(_(dic2).pluck("foo"));  // [ 'bar', 'baz' ]
//console.log(_(dic3).pluck("xcc"));  // [ 'baz' ]
//console.log(_(dic2).pluck("abc")); // []
//console.log(_({foo: 'bar', baz: "quuz"}).keys());  // [ 'foo', 'baz' ]
//console.log(_({foo: 'bar', baz: "quuz"}).values());  // [ 'bar', 'quuz' ]
let obj1 = {a:1, b:2};
let obj2 = {c:3, d:4};
let obj3 = {e:5, f:6};
let result = _.extend(obj1, obj2, obj3);
//console.log(result);   // { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }
//console.log(result === obj1);  // true
//console.log(obj1);   // { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }
//console.log(obj2)   // { c: 3, d: 4, e: 5, f: 6 }
let oldObj = {a:1, b:2};
//let newObj = _(oldObj).pick("a", "b");
//console.log(newObj);           // {a: 1, b:2}
//console.log(oldObj === newObj);    // false
//console.log(_(oldObj).pick("a"));   // {a:1}
//console.log(_(oldObj).pick("b", "c"));   // {b: 2}
//console.log(_(oldObj).omit("a"));  // {b: 2}
//console.log(_(oldObj).omit("a", "c"))  // {b: 2}
//console.log(_(oldObj).omit("a", "b"))  // {}
//console.log(_(obj3).has("c"));  // false
//console.log(_(obj3).has("e"));  // true


