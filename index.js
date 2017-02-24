
var _                = require('lodash');
var Discord          = require('discord.io');
var privateVariables = require('./privateVariables');
var counterModule    = require('./counter');
var commands         = require('./commands');

var bot = new Discord.Client({
    token: privateVariables.token,
    autorun: true
});

bot.on('ready', function() {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
    var messageMatch;
    var commandDef;
    _.forEach(commands.list, function (commandObj) {
        messageMatch = message.match(commandObj.re);
        if (messageMatch) {
            commandDef = commandObj;
            return false;
        }
    });

    if (messageMatch) {
        var message = '';

        switch(commandDef.type) {
            case 'counter':
                message = counterModule.getCounterMessage(commandDef, messageMatch);
                break;
            default:
                break;
        }

        bot.sendMessage({
            to: channelID,
            message: message
        });
    }
});