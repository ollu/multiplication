$(document).ready(function() {
  var theProduct, equation, multiplicand, multiplier, uniqueProducts;
  var multipliers = [0,1,2,3,4,5,6,7,8,9,10];

  function initialize() {
    newGame();
  }

  function newGame() {
    multiplicand = 4;

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
    theProduct = calculate(multiplicand, multiplier);

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

  function calculate(multiplier, multiplicand) {
    var product = multiplier * multiplicand;
    return product;
  }

  function getUniqueProducts(length) {
    var products = [];
    var product;
    var numbers = [0,1,2,3,4,5,6,7,8,9,10];

    // Remove current multiplier to avoid duplicate products
    numbers.splice(multiplier, 1);
    numbers.shuffle();

    for(var i = 0; i < length; i++) {
      product = calculate(numbers.pop(), multiplicand);
      products.push(product);
    }

    return products;
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
