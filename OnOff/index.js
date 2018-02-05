var express = require('express'); 
var app = express();
var path = require('path');
var gpio = require('rpi-gpio');
var port = 3000;

//gpi.DIR_HIGH seems to set the led to be off initially
gpio.setup(7, gpio.DIR_HIGH);

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

//console.log(path.join(__dirname, 'public'));

app.get('/', function(req, res){ 
 	res.render('index',{status:"Press the button To change the status of the Led"});
});

app.post('/led/off', function(req, res){
gpio.write(7, true, function(err) {
        if (err) throw err;
        console.log('Turning off Led');
	//console.log(path.join(__dirname, 'public'));
	return res.render('index', {status: "Led is Off"});
    });

});


app.post('/led/on', function(req, res){
gpio.write(7, false, function(err) {
        if (err) throw err;
        console.log('Turning on Led');
	//console.log(path.join(__dirname, 'public'));
	return res.render('index',{status: "Led is On"});
    });

});


app.listen(port, function () {
  console.log('LED Control Server started on', port)
})
