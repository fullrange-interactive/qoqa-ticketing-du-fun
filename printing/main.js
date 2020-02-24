const exec = require('child_process').exec;
const Gpio = require('onoff').Gpio;

const button = new Gpio(2, 'in', 'falling', {debounceTimeout: 30});
const buttonBaseOutput = new Gpio(3, 'out');
const led = new Gpio(4, 'out');

buttonBaseOutput.writeSync(0);
led.writeSync(1);

let printing = false;

button.watch((err, value) => {

  if (printing) {
    return;
  }

  printing = true;

  const iv = setInterval(_ => led.writeSync(led.readSync() ^ 1), 50);

  console.log("Button pressed !");
  exec("./printTicket.sh", // command line argument directly in string
    function (error, stdout, stderr) {      // one easy function to capture data/errors


      printing = false;
      clearInterval(iv);
      led.writeSync(1);

      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      if (error !== null) {
        console.log('exec error: ' + error);
      }

  });

});

console.log("Running qoqa-printing-service");

