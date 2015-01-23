'use strict';

var a = function() {
  this.local = 'a() ran';
};

var y = function(a) {
  return a();
};

var z = y(function() {
  this.local = 'anon ran';
});

console.log(z.local);

