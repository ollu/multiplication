$(document).ready(function() {
  var theProduct, equation, multiplicand, multiplier, uniqueProducts;
  var multipliers = [];

  function initialize() {
    multipliers.push(0,1,2,3,4,5,6,7,8,9,10);
    newGame();
  }

  function newGame() {
    multiplicand = 4;
    console.log(multipliers.length);
    if(multipliers.length) {
      multiplier = multipliers.shuffle().pop();
    }
    else {
      gameOver();
    }

    equation = multiplicand + ' &middot; ' + multiplier;

    // Display the equation
    $('.exercise').html(equation);

    // Get products for the buttons
    uniqueProducts = getUniqueProducts(3);

    // Get correct answer
    theProduct = multiplicand * multiplier;

    // Add the correct product
    uniqueProducts.push(theProduct);
    uniqueProducts.shuffle();

    $('.square span').each(function(index) {
      $(this).html(uniqueProducts.pop())
    });
  }

  function gameOver() {
    $('h1').html('Game Over!');
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
    if($(this).html() == theProduct) {
      newGame();
    }
  });

  // Start game
  initialize();
});
