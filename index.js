
var _                = require('lodash');
var Discord          = require('discord.io');
var privateVariables = require('./privateVariables');
var counterModule    = require('./counter');
var quoteModule      = require('./quote');
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
            case 'getQuote':
                var num = messageMatch[2];
                if (_.isString(num)) {
                    parseInt(num, 10);
                    message = quoteModule.getSpecificQuote(commandDef, num-1);
                } else {
                    message = quoteModule.getRandomQuote(commandDef);
                }
                break;
            case 'addQuote':
                message = quoteModule.addQuoteMessage(commandDef, messageMatch);
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