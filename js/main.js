$(document).ready(function() {
  var theProduct, equation, multiplicand, multiplier, uniqueProducts;
  var multipliers = new Array(0,1,2,3,4,5,6,7,8,9,10);
  var multipliersDone = [];

  function initialize() {
    multiplicand = 4;
    multiplier = multipliers.shuffle().pop();
    multipliersDone.push(multiplier);
    equation = multiplicand + ' &middot; ' + multiplier;
    theProduct = multiplicand * multiplier;

    $('.exercise').html(equation);
    uniqueProducts = getUniqueProducts(3);
    uniqueProducts.push(theProduct);
    uniqueProducts.shuffle();

    $('.square span').each(function(index) {
      $(this).html(uniqueProducts.pop())
    });
  }

  function getUniqueProducts(length) {
    var arr = [];
    for(var i = 0; i < length; i++) {
      arr.push(multipliers.pop() * multiplicand);
    }

    return arr;
  }

  /*
   * Add a shuffle function to Array object prototype
   * Usage :
   *  var tmpArray = ["a", "b", "c", "d", "e"];
   *  tmpArray.shuffle();
   */
  Array.prototype.shuffle = function (){
    var i = this.length, j, temp;
    if ( i == 0 ) return;
    while ( --i ) {
      j = Math.floor( Math.random() * ( i + 1 ) );
      temp = this[i];
      this[i] = this[j];
      this[j] = temp;
    }
    return this;
  };

  $('.square span').click(function() {
    console.log($(this).html());
  });

  // Start game
  initialize();
});
