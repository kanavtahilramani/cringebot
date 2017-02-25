var fs = require('fs');

exports.getRandomQuote = function(commandDef) {
	// open local file with quotes
	var user = require('./' + commandDef.filename);

	// set range for RNG
	var max = user.length - 1;

	// RNG to decide which quote to return
	var random = Math.floor(Math.random() * (max + 1));

	// set message to be returned
	var message = '#' + user[random].id + ' (' + user[random].date + '): ' + user[random].message;

	return message;
};

exports.getSpecificQuote = function(commandDef, num) {
	// open local file with quotes
	var user = require('./' + commandDef.filename);

	// input checking
	if (num >= user.length) {
		return 'That quote does not exist! There are currently ' + (user.length) + ' quotes.';
	} else if (num <= -1 || !Number.isInteger(num)) {
		return;
	}

	// set message to be returned
	var message = '#' + user[num].id + ' (' + user[num].date + '): ' + user[num].message;

	return message;
};

exports.addQuoteMessage = function(commandDef, messageMatch) {
	// open local file with quotes
	var user = require('./' + commandDef.filename);

	// set new length of JSON array containing quotes
	var newLength = user.length + 1;

	// get current date
	var dateObj = new Date();
	var month = dateObj.getMonth() + 1;
	var date = dateObj.getDate();
	var year = dateObj.getFullYear();

	// add new quote to JSON array
	user.push({"id": newLength, "date": month + '/' + date + '/' + year, "message": messageMatch[2]});

	// write to file
	fs.writeFile(commandDef.filename + '.json', JSON.stringify(user), function (err) {
        if (err) console.error(err);
        console.log('Saved!');
    });

	// set message to be returned
    var message = 'Successfully added quote #' + newLength.toString() + '!';

	return message;
};