$(document).ready(function() {
  var exerciseStart, theProduct, equation, gameOver, multiplicand,
  multiplier, timer, uniqueProducts;
  var multipliers;

  function initialize() {
    $('h1').html("Välj 1-9");

    if (!$(".play-ui").hasClass("hidden")) {
      $(".play-ui").addClass("hidden");
    }

    if ($(".startup-ui").hasClass("hidden")) {
      $(".startup-ui").removeClass("hidden");
    }
    setBestTimeOnButton();
  }

  function initGame(multip) {
    if (!$(".startup-ui").hasClass("hidden")) {
      $(".startup-ui").addClass("hidden");
    }

    if ($(".play-ui").hasClass("hidden")) {
      $(".play-ui").removeClass("hidden");
    }

    multiplicand = multip;
    exerciseStart = new Date();
    exerciseStart = exerciseStart.getTime();
    resetGame();
    timer = setInterval(function(){ updateTimer() }, 10);
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
    uniqueProducts = generateUniqueProducts(4);

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
    var newTime = getTimeSpent();
    var key = multiplicand;

    setHighScore(key, newTime);

    showModal();

    var highScore = getHighScore(key);
    highScore = convertTimeToString(highScore);
    newTime = convertTimeToString(newTime);

    $('.result').html(newTime);
    $('.highScore').html(highScore);
    $('.exercise').html('Game Over!');

    finished = true;
  }

  function calculate(multiplier, multiplicand) {
    var product = multiplier * multiplicand;
    return product;
  }

  function updateTimer() {
    var timeSpent = getTimeSpent();
    var result = convertTimeToString(timeSpent);

    $('.result').html(result);
  }

  function convertTimeToString(timeSpent) {
    var t = new Date(timeSpent);

    var minutes = '0' + t.getUTCMinutes();
    var seconds = '0' + t.getUTCSeconds();
    var hundredth = '0' + Math.floor(t.getUTCMilliseconds() / 10);

    var result = minutes.slice(-2) + ':';
    result += seconds.slice(-2) + ':';
    result += hundredth.slice(-2);

    return result;
  }

  function getTimeSpent() {
    var exerciseEnd = new Date();
    exerciseEnd = exerciseEnd.getTime();

    return exerciseEnd - exerciseStart;
  }

  function resetGame() {
    multipliers = [0,1,2,3,4,5,6,7,8,9,10];
    finished = false;
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

  Storage.prototype.setObject = function(key, value) {
      this.setItem(key, JSON.stringify(value));
  }

  Storage.prototype.getObject = function(key) {
      var value = this.getItem(key);
      return value && JSON.parse(value);
  }

  function setBestTimeOnButton() {
    $('.choose').each(function(index) {
      var bestTime = getHighScore($(this).find('digit').html());
      bestTime = convertTimeToString(bestTime);
      $(this).find('.best-time').html(bestTime);
    });

  }

  function setHighScore(key, newTime) {
    var bestTime = getHighScore(key);
    if (bestTime) {
      if ( newTime < bestTime ) {
        localStorage.setObject(key, newTime);
      }
    }
    else {
      localStorage.setObject(key, newTime);
    }
  }

  function getHighScore(key) {
    return localStorage.getObject(key);
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

  $('.choose').on('click', function(event) {
    event.stopPropagation(); event.preventDefault();
    var val = $(this).find('digit').html();

    initGame(val);
  });

  // Start on same level again button
  $('#restart-game').on('click', function(event) {
    event.stopPropagation(); event.preventDefault();
    hideModal();
    resetGame();
    initGame(multiplicand);
  });

  // Start new game button
  $('#new-game').on('click', function(event) {
    event.stopPropagation(); event.preventDefault();
    hideModal();
    initialize();
  });

  // Logic for answer buttons
  $('button').on('click', function(event) {
    event.stopPropagation(); event.preventDefault();
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
