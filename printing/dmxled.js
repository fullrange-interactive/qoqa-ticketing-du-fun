let artnet = require('artnet')({
	host: '10.7.208.146' // This is the IP address of your Artnet -> DMX interface
});

// The DMX address on which you LED is connected
const DMX_LED_ADDRESS = 1;

// For my LED , this is: Dimmer, R, G, B
// Change to whatever is appropriate for your light
const VALUE_ON = [255, 255, 0, 0];

// If you want the LED  to have some other value
// when it's "off"
const VALUE_OFF = [255, 0, 255 ,0];

// How long the light should remain on, in milliseconds
const ON_DURATION = 10000;

// The blinking period in milliseconds
const BLINK_PERIOD = 500;

var isOn = false;
var duration = 0;

// First, we send the on value
blink();


function blink() {

	var toWrite = isOn ? VALUE_OFF : VALUE_ON;
	duration += BLINK_PERIOD;
	isOn = !isOn;

	if (duration >= ON_DURATION) {
		toWrite = VALUE_OFF;
	} else {
		setTimeout(blink, BLINK_PERIOD);
	}

	artnet.set(DMX_LED_ADDRESS, toWrite, () => {
		if (duration >= ON_DURATION)
			artnet.close();
	})

}