var utils = require('./utils');

exports.list = {
    cringe: {
        type: 'counter',
        re: new RegExp(/!cringe (<@.*>)/, 'i'),
        filename: 'cringeMap',
        message: utils.stringTemplate`${0} has been cringe ${1} ${2}.`
    },
    mad: {
        type: 'counter',
        re: new RegExp(/!mad (<@.*>)/, 'i'),
        filename: 'madMap',
        message: utils.stringTemplate`${0} has been mad ${1} ${2}. :joy:`
    }
};