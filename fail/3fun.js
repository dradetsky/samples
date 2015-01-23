var b = function(arg) {
  var x = 'outer';
  var f = function() {
    if (arg) {
      var x = 'inner';
      console.log(x);
    } else {
      console.log(x);
    }
  };
  f();
};

b(true);
b(false);
