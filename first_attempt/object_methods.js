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
      })
    },

    range: function(start, end) {
      let result = [];
      if (end) {
        for (let i = start; i < end; i += 1) {
          result.push(i);
        }
      } else {
        for (let i = 0; i <= start; i += 1) {
          result.push(i);
        }
      }

      return result;
    },

    lastIndexOf: function() {
      return element.length - 1;
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
  };

  return u;
};




// tests
//console.log(_([1,2,3]).first()); // 1
//console.log(_([1,2,3]).last());  // 3
//console.log(_([1,2,3,4]).without(2)); // [1,3,4,]];
console.log(_().range(3));   // [0,1,2,3]
//console.log(_().range(1, 5));  // [1,2,3,4]
//console.log(_([1,2,3,8]).lastIndexOf()); // 3
//console.log(_([9,8,7,6]).sample()); // (random element) from [9,8,7,6]
//console.log(_([9,8,7,6]).sample(2));  // [8,9] (random 2 elements from [9,8,7,6])


