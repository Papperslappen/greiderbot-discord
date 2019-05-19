const commando = require('discord.js-commando');
const wiki = require('wikipedia-js')

module.exports = class KillgissaCommand extends commando.Command {
	constructor(client) {
        console.debug("Registering killgissa")
		super(client, {
			name: 'killgissa',
            group: 'annat',
            aliases: ['fakta','wiki'],
			memberName: 'killgissa',
			description: 'Killgissar om ett ett valfritt ämne',
			args: [
				{
					key: 'topic',
					label: 'ämne',
					prompt: 'Vilket ämne vill du veta mer om',
					type: 'string'
				}
			]
		});
	}

	run(msg, { topic }) {
		return msg.reply(topic);
	}
};