var a = function() {
  console.log('in a');
};

var y = function(a) {
  return a();
};

y(function() {
  console.log('not in a');
});

