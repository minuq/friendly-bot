'use strict'

const Command = require('../models/Command')
const Reply = require('../models/messages/Reply')
const Help = require('../models/messages/Help')
const moment = require('moment-timezone')

class Time extends Command {
    trigger () {
        return 'time'
    }

    help () {
        return new Help().addTitle('Global Time').
            addDescription('Shows the current or a set time for different Timezones!').
            addCommand('!time', 'Shows current time').
            addCommand('!time HH:mm', 'Shows given time')
    }

    handle (message, args) {
        let time = moment()

        if (args.length > 0) {
            let arg = args[0]
            let regex = new RegExp('/([01]?[0-9]|2[0-3]):[0-5][0-9]/')
            if (!regex.test(time)) {
                throw 'Wrong Argument Format!'
            }
            time = moment(arg, ['h:m a', 'H:m'])
        }

        let data = {
            'EVE': time.utc().format('HH:mm'),
            'EU': time.tz('Europe/Berlin').format('HH:mm'),
            'US East': time.tz('America/New_York').format('HH:mm'),
            'US West': time.tz('America/Los_Angeles').format('HH:mm'),
            'AU': time.tz('Australia/Sydney').format('HH:mm'),
            'RUS': time.tz('Europe/Moscow').format('HH:mm'),
        }

        let reply = new Reply(message)
        reply.addField('Timezone', Object.keys(data).join('\n'), true)
        reply.addField('Tile', Object.values(data).join('\n'), true)
        reply.send()
    }
}

module.exports = Time