# node dmxled.js &
# rm -rf /home/pi/qoqa-ticketing-du-fun/printing/random
wget -O /home/pi/qoqa-ticketing-du-fun/printing/random http://10.0.1.175:8080/api/render/random
# lp -d EPSON_TM-T20II random
# rm -rf random
