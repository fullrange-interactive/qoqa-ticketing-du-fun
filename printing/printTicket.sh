node dmxled.js &
wget http://10.0.1.175:8080/api/render/random
lp -d EPSON_TM-T20II random
rm -rf random
