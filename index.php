<?php
  $images = array();
  foreach (new DirectoryIterator('images/bg') as $fileInfo) {
    if($fileInfo->isDot()) continue;
    $images[] = $fileInfo->getFilename();
  }
  $image = $images[array_rand($images, 1)];
  $background = 'background="images/bg/' . $image . '"';
?>

<!DOCTYPE html>
<html>
<head>
  <title>Gångertabellen</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link href="css/bootstrap.min.css" rel="stylesheet">
  <link href="css/default.css" rel="stylesheet">
</head>
<body <?php echo $background; ?>>

<div id="play-again" class="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title">Snyggt jobbat!</h4>
      </div>
      <div class="modal-body">
      <strong>Din tid blev:</strong> <span class="result"></span> <br />
      <strong>Bästa tid:</strong> <span class="highScore"></span>
      </div>
      <div class="modal-footer">
        <button type="button" id="restart-game" class="btn btn-primary">Igen!</button>
        <button type="button" id="new-game" class="btn btn-info">Välj en ny</button>
      </div>
    </div>
  </div>
</div>

  <h4 class="text-center header bg-danger">Öva på gångertabellen</h4>
  <h1 class="text-center exercise bg-danger"></h1>
  <div class="wrapper startup-ui">
    <button type="button" class="big btn btn-default choose">
      <digit>1</digit>
      <div class="best-time">00:00:00</div>
    </button>
    <button type="button" class="big btn btn-default choose">
      <digit>2</digit>
      <div class="best-time">00:00:00</div>
    </button>
    <button type="button" class="big btn btn-default choose">
      <digit>3</digit>
      <div class="best-time">00:00:00</div>
    </button>
    <button type="button" class="big btn btn-default choose">
      <digit>4</digit>
      <div class="best-time">00:00:00</div>
    </button>
    <button type="button" class="big btn btn-default choose">
      <digit>5</digit>
      <div class="best-time">00:00:00</div>
    </button>
    <button type="button" class="big btn btn-default choose">
      <digit>6</digit>
      <div class="best-time">00:00:00</div>
    </button>
    <button type="button" class="big btn btn-default choose">
      <digit>7</digit>
      <div class="best-time">00:00:00</div>
    </button>
    <button type="button" class="big btn btn-default choose">
      <digit>8</digit>
      <div class="best-time">00:00:00</div>
    </button>
    <button type="button" class="big btn btn-default choose">
      <digit>9</digit>
      <div class="best-time">00:00:00</div>
    </button>
  </div>
  <div class="wrapper clearfix play-ui">
    <button type="button" class="big btn btn-primary btn-0">0</button>
    <button type="button" class="big btn btn-primary btn-1">1</button>
    <button type="button" class="big btn btn-primary btn-2">2</button>
    <button type="button" class="big btn btn-primary btn-3">3</button>
    <button type="button" class="big btn btn-primary btn-4">4</button>
  </div>
  <div class="text-center result bg-success play-ui">00:00:00</div>
  <script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script type="text/javascript" src="js/main.js"></script>
</body>
</html>
