var fs = require('fs');

exports.getCounterMessage = function(commandDef, messageMatch) {
    // get mapping json store
    var map = require('./' + commandDef.filename);

    // get first grouping (username)
    var user = messageMatch[1];

    // init to 1
    if (!map[user]) {
        map[user] = 1;
    }

    // generate message from template
    var message = commandDef.message(user, map[user], map[user] === 1 ? 'time': 'times');

    // increment
    map[user]++;

    // save to file
    fs.writeFile(commandDef.filename + '.json', JSON.stringify(map), function (err) {
        if (err) console.error(err);
        console.log('Saved!');
    });

    return message;
};
