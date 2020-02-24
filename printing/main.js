const exec = require('child_process').exec;

if (process.argv.indexOf('simulation') === -1) {
  var Gpio = require('onoff').Gpio;
}

// START CUSTOMIZATION
let artnet = require('artnet')({
  host: '10.0.1.220' // This is the IP address of your Artnet -> DMX interface
});


// The DMX address on which you LED is connected
const DMX_LED_ADDRESS = 1;

// For my LED , this is: Dimmer, R, G, B
// Change to whatever is appropriate for your light
const VALUE_ON = [255, 0, 0, 255,255];

// If you want the LED  to have some other value
// when it's "off"
const VALUE_OFF = [255, 0, 0 ,255, 0];

// How long the light should remain on, in milliseconds
const ON_DURATION = 10000;

// The blinking period in milliseconds
const BLINK_PERIOD = 500;

// END CUSTOMIZATION 
// 

if (process.argv.indexOf('simulation') === -1) {

  var button = new Gpio(2, 'in', 'falling', {debounceTimeout: 30});
  var buttonBaseOutput = new Gpio(3, 'out');
  var led = new Gpio(4, 'out');

  buttonBaseOutput.writeSync(0);
  led.writeSync(1);

}

let printing = false;

function print() {

  if (printing) {
    return;
  }

  printing = true;

  blinking = true;
  blinkDuration = 0;

  if (process.argv.indexOf('simulation') === -1) {
    var iv = setInterval(_ => led.writeSync(led.readSync() ^ 1), 50);
  }

  console.log("Button pressed !");
  exec("./printTicket.sh", // command line argument directly in string
    function (error, stdout, stderr) {      // one easy function to capture data/errors


      printing = false;

      if (process.argv.indexOf('simulation') === -1) {
        clearInterval(iv);
        led.writeSync(1);
      }

      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }

  });

}

if (process.argv.indexOf('simulation') === -1) {
  button.watch(print);
} else {
  process.stdin.on('data', print);
}


let blinkDuration = 0;
let blinking = false;
let isOn = false;

function blinkDMXLED() {

  if (!blinking)
    return;

  var toWrite = isOn ? VALUE_OFF : VALUE_ON;
  blinkDuration += BLINK_PERIOD;
  isOn = !isOn;

  if (blinkDuration >= ON_DURATION) {
    toWrite = VALUE_OFF;
    blinking = false;
  }

  artnet.set(DMX_LED_ADDRESS, toWrite, () => {
    console.log("blink is " + toWrite)
    // if (duration >= ON_DURATION)
    //   artnet.close();
  })

}

const DMXLEDBlinkInterval = setInterval(blinkDMXLED, BLINK_PERIOD);

console.log("Running qoqa-printing-service. Simulation = " + process.argv.indexOf('simulation'));
