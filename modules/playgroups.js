const config = require('../config.js');
var _ = require('lodash');
const commando = require('discord.js-commando');
// const oneLine = require('common-tags').oneLine;

module.exports = {
    init: function(client){
        client.registry
            .registerGroup('playgroups')
            .registerCommand(AddToPlayGroup)
            .registerCommand(RemoveFromPlayGroup);
    }
}


class AddToPlayGroup extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'spela',
			aliases: [],
			group: 'playgroups',
			memberName: 'spela',
			description: 'Lägger dig i en pingningsbar roll för ett spel.',
            details: `
            Anv: !spela <spel> – Lägger till dig i en roll som andra kan pinga när de vill spela det spelet`
			,
			examples: ['!spela cs'],

			args: [
				{
					key: 'spel',
					label: 'spel',
					prompt: 'vilket spel vill du lägga till dig i rollen för',
					type: 'string',
				}
			]
		});
	}

	async run(msg, args) {
        let spel = args.spel
        if(spel == "allan"){
          return msg.reply("",{file:random_allan()});
        }
        if(spel == "shoreline"){
          return msg.reply("https://youtu.be/VV_irnCV7xc");
        }
        if(!msg.guild){
            return msg.reply(`Det här kommandot kan inte användas i DM`);
        }
        let role = _.find(msg.guild.roles.array(),r => (r.name == "spela "+spel));
        console.log(role);
        if(role){
            await msg.member.addRole(role,`[BOT] La till rollen ${role.name} på begäran av användaren`);
            return msg.reply(`Du ska nu vara tillagd i spela ${spel}, för att gå ur rollen, använd kommandot sluta ${spel}`);
        }else{
            let names = _.map(msg.guild.roles.cache.array(),r => r.name)
                .filter(s=>s.startsWith("spela"))
                .join(", ");
            return msg.reply(`Tyvärr finns inte ${spel} som pingningsbar roll (än),
            kontakta en administratör för att få det fixat.
            Roller som finns för tillfället: ${names}`);
        }

    }
};

class RemoveFromPlayGroup extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'sluta',
			aliases: [],
			group: 'playgroups',
			memberName: 'sluta',
			description: 'Tar bort dig från en roll',
            details: `
            Anv: !sluta <spel> – Tar bort dig från en roll`
			,
			examples: ['!sluta cs'],

			args: [
				{
					key: 'spel',
					label: 'spel',
					prompt: 'vilket spel vill du ta bort dig ur rollen för',
					type: 'string',
				}
			]
		});
	}

	async run(msg, args) {
        if(!msg.guild){
            return msg.reply(`Det här kommandot kan inte användas i DM`);
        }
        let spel = args.spel;
        let rolename = `spela ${spel}`;
        let role = _.find(msg.member.roles.cache.array(), r => (r.name == rolename));
        console.log(role)
        if(role){
            await msg.member.removeRole(role)
              .catch(console.log);
            return msg.reply("Du är inte längre med i spela "+spel);
          }else{
             return msg.reply(`Det finns ingen roll som heter ${rolename}`)
          }
    }
};

function random_allan(){
  allans = [
    "https://media.giphy.com/media/7U5k73n4CuuKQ/giphy.gif",
    "https://media.giphy.com/media/TAbgN3sgs7veo/giphy.gif",
    "https://media.giphy.com/media/MrUwoRBik4Lja/giphy.gif",
  ]
  return _.sample(allans);
}
