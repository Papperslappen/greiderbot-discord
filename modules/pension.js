const config = require('../config.js');
const storage = require('node-persist');
const discord = require('discord.js');
const commando = require('discord.js-commando');
var moment = require('moment');

module.exports = {
  init: function (client) {
    storage.init().then(() => {
      client.registry
        .registerGroup('pension')
        .registerCommand(PensionChannel)
        .registerCommand(SetPensionCategory);
    }).catch(console.error)
  }
}

class SetPensionCategory extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'pension_category',
      aliases: [''],
      group: 'pension',
      memberName: 'pension_category',
      description: '',
      details: ``,
      guildOnly: true,
      args: [
        {
          key: 'category',
          label: 'category',
          prompt: '',
          type: 'string',
        }
      ]
    });
  }
  hasPermission(msg) {
    return this.client.isOwner(msg.author) || msg.member.hasPermission('ADMINISTRATOR');
  }
  async run(msg, args) {
    console.log("command pension_category")
    try {
      if (args["category"]) {
        await storage.setItem('pension_category', args["category"]);
        await msg.reply(`set pension_category to ${await storage.getItem("pension_category")}`);
      }
    } catch (error) {
      console.error(error);
    }
  }
};

class PensionChannel extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'pensionera',
      aliases: ['pension, panschonera'],
      group: 'pension',
      memberName: 'pension',
      description: 'pensionera en kanal',
      details: ``,
      guildOnly: true,
    });
  }
  hasPermission(msg) {
    var canUseCommand = this.client.isOwner(msg.author) || msg.member.roles.some(role => role.name === "Admin");
    // var canMoveChannel = msg.guild.me.hasPermission()
    // var canEditChannelPermissions = ;
    return canUseCommand;
  }
  async run(msg, args) {
    console.log("command pensionera");
    try {
      var category = await storage.getItem("pension_category");
      var embed = new discord.RichEmbed()
        .setTitle("Denna kanal kommer raderas inom kort")
        .setColor(0xFFFF00)
        .setAuthor(msg.author.username, msg.author.avatarURL)
        .setDescription(`Då denna kanal inte varit aktiv på minst 30 dagar kommer den att raderas (dock tidigast ${moment().add(14, 'days').locale('sv').format('dddd Do MMMM')}). Passa på att spara ner sånt som du inte vill ska försvinna.`)
        .setTimestamp()
        .setFooter(`${this.client.user.username}`);
      const pensionMessage = await msg.channel.send({ embed });
      var channel = await msg.channel.setParent(category, `Flyttades på begäran av ${msg.author.tag}`);
      await channel.lockPermissions();
      await msg.delete();
    } catch (e) {
      console.error(e);
    }
  }
};
