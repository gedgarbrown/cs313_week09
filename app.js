const express = require('express');
const app = express();
const port = process.env.PORT || 8888;
const path = require('path');


function letterStamped(weight) {

	
	var price = 0.0;
	
	if (weight <= 3.5) {
		price = 1.0;
	}
	if (weight <= 3) {
		price = 0.85;
	}
	if (weight <= 2) {
		price = 0.7;
	}
	if (weight <= 1) {
		price = 0.55;
	}
	
	return price;
}

function letterMetered(weight) {
	
	var price = 0.0;
	
	if (weight <= 3.5) {
		price = 0.95;
	}
	if (weight <= 3) {
		price = 0.8;
	}
	if (weight <= 2) {
		price = 0.65;
	}
	if (weight <= 1) {
		price = 0.50;
	}
	
	return price;
}

function largeEvelope(weight) {
	
	var price = 0.0;
	
	if (weight <= 13) {
		price = 2.8;
	}
	if (weight <= 12) {
		price = 2.65;
	}
	if (weight <= 11) {
		price = 2.5;
	}
	if (weight <= 10) {
		price = 2.35;
	}
	if (weight <= 9) {
		price = 2.2;
	}
	if (weight <= 8) {
		price = 2.05;
	}
	if (weight <= 7) {
		price = 1.9;
	}
	if (weight <= 6) {
		price = 1.75;
	}
	if (weight <= 5) {
		price = 1.6;
	}
	if (weight <= 4) {
		price = 1.45;
	}
	if (weight <= 3) {
		price = 1.3;
	}
	if (weight <= 2) {
		price = 1.15;
	}
	if (weight <= 1) {
		price = 1.0;
	}

	
	return price;
}

function firstClass(weight) {
	
	var price = 0.0;
	
	if (weight <= 13) {
		price = 5.71;
	}
	if (weight <= 12) {
		price = 5.19;
	}
	if (weight <= 11) {
		price = 5.19;
	}
	if (weight <= 10) {
		price = 5.19;
	}
	if (weight <= 9) {
		price = 5.19;
	}
	if (weight <= 8) {
		price = 4.39;
	}
	if (weight <= 7) {
		price = 4.39;
	}
	if (weight <= 6) {
		price = 4.39;
	}
	if (weight <= 5) {
		price = 4.39;
	}
	if (weight <= 4) {
		price = 3.66;
	}
	if (weight <= 3) {
		price = 3.66;
	}
	if (weight <= 2) {
		price = 3.66;
	}
	if (weight <= 1) {
		price = 3.66;
	}
	
	return price;
}

app.use(express.urlencoded());

//app.get('/', (req, res) => res.send("index.html"));
app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/pricing',function(req,res){
	var weight=req.body.weight;
	var mail_type=req.body.mail_type;
	console.log("Weight ="+weight+", mail_type is "+mail_type);
	
	var response ="not set";
	
	switch(mail_type){
	
		case '0':
			price = letterStamped(weight);
			if (price == 0.0) {
				response = "Letters cannot be over 3.5 oz.  Price unavailable.";
			}
			else {
				response = "Price for a " + String(weight) + " oz.  Letter(Stamped) is $"+price.toFixed(2)+".";
			}
		break;
		case '1':
			price = letterMetered(weight);
			if (price == 0.0) {
				response = "Letters cannot be over 3.5 oz.  Price unavailable.";
			}
			else {
				response = "Price for a " + String(weight) + " oz. Letter(Metered) is $"+ price.toFixed(2)+".";
			}
		break;
		case '2':
			price = largeEvelope(weight);
			if (price == 0.0) {
				response = "Flat Envelopes cannot be over 13 oz.  Price unavailable.";
			}
			else {
				response = "Price for a " + String(weight) + " oz. Flat Envelope is $"+ price.toFixed(2)+".";
			}
		break;
		case '3':
			price = firstClass(weight);
			if (price == 0.0) {
				response = "First-Class Packages cannot be over 13 oz.  Price unavailable.";
			}
			else {
				response = "Price for a " + String(weight) + " oz. Letter(Stamped) is $"+ price.toFixed(2)+".";
			}
		break;
		default:
			response="Unable to process request.";
		break;
		
	}
	
	
	
	console.log(response);
	res.send(response);
	//res.render('<a href="../">Back</a>');
	
	app.use(express.static(__dirname));
	
	
	res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));