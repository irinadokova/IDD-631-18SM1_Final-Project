var table;
var img;

function preload() {
  table = loadTable( "data/driving.csv" );
  img = loadImage("data/road.jpg");
}

function setup() {
  var canvas = createCanvas( 1500, 750);
  canvas.parent("dataviz");
  console.log( table.getRowCount() );
  console.log( table.getColumnCount() );
}

function draw() {
  //background(255);
  image ( img, 0, 0, width, height );
  textSize(25);
  fill(255);
  text('Driving Data_Irina Dokova', 15, 50);
  var dataTipXY = drawLine();
  dataTip( dataTipXY[0], dataTipXY[1], dataTipXY[2] );
}

function drawLine() {
  var dataTipX = -1;
  var dataTipY = -1;
  var message = "";
  strokeWeight(1);
  var lastXax = 0;
  var lastYax = 0;
  var lastXay = 0;
  var lastYay = 0;
  var lastXaz = 0;
  var lastYaz = 0;
  var markerSize = 10;
  var startPoint = 0;
  var endPoint = table.getRowCount();
  for( i=startPoint; i<endPoint; i++ ) {
    var row = table.getRow(i);
    var ax = row.get(0); // accelerometer x reading
    var ay = row.get(1); // accelerometer y reading
    var az = row.get(2); // accelerometer z reading
    var timeStamp = i * 200; //number of milliseconds
    // x accelerometer
    var y = map( ax, -15, 15, 0, height );
    var x = map( timeStamp, 200*startPoint, 200*endPoint, 0, width );
    fill( 220, 20, 60, 128);
    stroke( 220, 20, 60, 64); // red
    rect( x, y, markerSize, markerSize );
    line( lastXax, lastYax, x, y );
    if( mouseX < x + markerSize/2 && mouseX > x - markerSize/2 &&
        mouseY < y + markerSize/2 && mouseY > y - markerSize/2 ) {
        dataTipX = x;
        dataTipY = y;
        message = " Acceleration in X = " + ax + " m/s^2\n" + " Time = " + timeStamp + " ms";
        }
    lastXax = x;
    lastYax = y;

    // y accelerometer
    var y = map( ay, -15, 15, 0, height );
    var x = map( timeStamp, 200*startPoint, 200*endPoint, 0, width );
    fill(0,128,0, 128); // green
    stroke( 0,128,0, 24);
    rect( x, y, markerSize, markerSize );
    line( lastXay, lastYay, x, y );
    if( mouseX < x + markerSize/2 && mouseX > x - markerSize/2 &&
        mouseY < y + markerSize/2 && mouseY > y - markerSize/2 ) {
        dataTipX = x;
        dataTipY = y;
        message = " Acceleration in Y = " + ay + " m/s^2\n" + " Time = " + timeStamp + " ms";
        }
    lastXay = x;
    lastYay = y;

    // z accelerometer
    var y = map( az, -15, 15, 0, height );
    var x = map( timeStamp, 200*startPoint, 200*endPoint, 0, width );
    fill( 255, 215, 0, 128); //yellow
    stroke( 255, 215, 0, 64);
    rect( x, y, markerSize, markerSize );
    line( lastXaz, lastYaz, x, y );
    if( mouseX < x + markerSize/2 && mouseX > x - markerSize/2 &&
        mouseY < y + markerSize/2 && mouseY > y - markerSize/2 ) {
        dataTipX = x;
        dataTipY = y;
        message = " Acceleration in Z = " + az + " m/s^2\n" + " Time = " + timeStamp + " ms";
        }
    lastXaz = x;
    lastYaz = y;
  }

  return [dataTipX, dataTipY, message];
}

function dataTip( x, y, message ) {
  if( x > 0 && y > 0) {
    var boxWidth = 300;
    var boxHeight = 50;
    noStroke();
    fill( 105, 105, 105, 200 );
    if( y < boxHeight ) {
      rect( x-boxWidth/2, y, boxWidth, boxHeight );
      textSize(20);
      fill( 255);
      text( message, x-boxWidth/2, y, boxWidth, boxHeight );
    } else {
      rect( x-boxWidth/2, y-boxHeight, boxWidth, boxHeight ) ;
      textSize(20);
      fill(255);
      text( message, x-boxWidth/2, y-boxHeight, boxWidth, boxHeight );
    }
  }
}

//GitHub Pages
//github.io
