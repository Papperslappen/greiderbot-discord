const commando = require('discord.js-commando');
const discord = require('discord.js');
var _ = require('lodash');

module.exports = {
    init: function(client){
        client.registry
            .registerGroup('mix')
            .registerCommand(Mix)
    }
}

class Mix extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'mix',
			aliases: ['blanda','mixa'],
			group: 'mix',
			memberName: 'mix',
			description: 'Blanda',
            details: `
            Anv: !blanda <lista med ord>`
			,
			examples: ['!blanda Adam Bertil Caesar'],

			args: [
				{
					key: 'names',
					label: 'names',
					prompt: 'Vilka ord vill du blanda',
					type: 'string',
          infinite: true,
				}
			]
		});
	}
  async run(msg,args){
    try{
        var embed = new discord.MessageEmbed()
          .setColor(0x11CCFF)
          .setAuthor(msg.author.username, msg.author.avatarURL)
          .setDescription(`${
            _.shuffle(args.names).join("\n")
          }`)
          .setTimestamp()
          .setFooter(`${this.client.user.username}`);
          const mixmsg = await msg.channel.send({embed});
    }catch(error){
      console.error(error);
    }
  }
};
