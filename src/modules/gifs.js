'use strict';

const Module = require('../module');
const request = require('request');

class Gifs extends Module {

    trigger(){
        return "gif";
    }

    help(){
        return "Random gif from imgur. \n" +
            "\n\n" +
            "Available commands:\n" +
            "!gifs \t Get a random gif";
    }

    restrictedChannel() {
        return false;
    }

    handle(message){
        request('https://imgur.com/r/gifs/hot.json', (error, response, body) => {

            if(!error && response.statusCode == 200) {
                var msg;
                var data = JSON.parse(body)['data'];

                var object = data[Math.floor(Math.random()*data.length)];

                msg = "```" + object.title + "```" + "\n" + `http://imgur.com/${object.hash}${object.ext.replace(/\?.*/, '')}`;

            } else {
                msg = "Something went wrong. Best ping @Crow LightBringer#7621";
            }

            message.channel.send(msg);
        });
    }
}

module.exports = function(bot) {
    new Gifs(bot);
};