$(document).ready(function() {
  var exerciseStart, theProduct, equation, gameOver, multiplicand,
  multiplier, timer, uniqueProducts;
  var multipliers = [0,1,2,3,4,5,6,7,8,9,10];

  function initialize() {
    $('h1').html("Välj 1-9");
    for (var i = 1; i <= 9; i++) {
      var button = '<button type="button"';
      button += 'class="btn btn-default choose">';
      button +=  + i + '</button>';
      $('.startup-ui').append(button);
    };

    $('.choose').click(function(index) {
      var val = $(this).html();
      initGame(val);
    });
  }

  function initGame(multip) {
    $(".startup-ui").addClass("hidden");
    $(".play-ui").removeClass("hidden");
    multiplicand = multip;
    exerciseStart = new Date();
    exerciseStart = exerciseStart.getTime();
    finished = false;
    timer = setInterval(function(){ startTimer() }, 10);
    newGame();
  }

  function newGame() {

    if(multipliers.length) {
      multiplier = multipliers.shuffle().pop();
    }
    else {
      gameOver();
    }

    equation = multiplicand + ' &middot; ' + multiplier;

    // Display the equation
    if(!finished) {
      $('.exercise').html(equation);
    }

    // Get products for the buttons
    uniqueProducts = generateUniqueProducts(3);

    // Get correct answer
    theProduct = calculate(multiplicand, multiplier);

    // Add the correct product
    uniqueProducts.push(theProduct);
    uniqueProducts.shuffle();

    $('.play-ui button').each(function(index) {
      $(this).html(uniqueProducts.pop())
    });
  }

  function gameOver() {
    stopTimer();
    $('.exercise').html('Game Over!');
    finished = true;
  }

  function calculate(multiplier, multiplicand) {
    var product = multiplier * multiplicand;
    return product;
  }

  function startTimer() {
    var exerciseEnd = new Date();
    exerciseEnd = exerciseEnd.getTime();

    var d = exerciseEnd - exerciseStart;
    d = new Date(d);

    var minutes = '0' + d.getUTCMinutes();
    var seconds = '0' + d.getUTCSeconds();
    var hundredth = '0' + Math.floor(d.getUTCMilliseconds() / 10);

    var result = minutes.slice(-2) + ':';
    result += seconds.slice(-2) + ':';
    result += hundredth.slice(-2);

    $('.result').html(result);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  function showModal() {
    $('#play-again').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  function hideModal() {
    $('#play-again').modal('hide');
  }

  /**
   * Generate products to be placed on the buttons
   * @param  int length How many unigue products to produce
   * @return array        Array containing unique products
   */
  function generateUniqueProducts(length) {
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

  $('button').click(function() {
    if(!finished) {
      if($(this).html() == theProduct) {
        newGame();
      }
      else {
        if(multipliers.indexOf(multiplier) === -1) {
          multipliers.push(multiplier);
        }
      }
    }
  });

  // Start game
  initialize();
});
