const config = require('../config.js');
const commando = require('discord.js-commando');
const axios = require('axios')
const sleep = require('util').promisify(setTimeout)

module.exports = {
    init: function(client){
        client.registry
            .registerGroup('dicebot')
            .registerCommand(Roll)
    }
}

class Roll extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'roll',
			aliases: ['slå','tärning'],
			group: 'dicebot',
			memberName: 'spela',
			description: 'Slå en tärning',
            details: `
            Anv: !slå <tärning> – Slår en tärning och skriver ut resultatet.
            Funkar med både svensk och engelsk notation`
			,
			examples: ['!slå 2t10','!slå d8 + d4','!slå d6+1'],

			args: [
				{
					key: 'dice',
					label: 'dice',
					prompt: 'vilka tärningar vill du slå?',
					type: 'string',
				}
			]
		});
	}
  async run(msg,args){
    try{
      const response = await axios.get(`http://${config.dicebot.url}:${config.dicebot.port}/roll/${args.dice}`);
      if(response.data.result){
        let reply = await msg.reply(`🎲${args.dice}🎲`);
        await sleep(200);
        await reply.edit(`🎲${response.data.result}🎲`)
      }
    }catch(error){
      console.error(error);
    }
  }
}
