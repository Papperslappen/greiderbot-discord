const config = require('../config.js');
var _ = require('lodash');
var _commands = {};


function addCommand(name, ic, ht=""){
    _commands[name] = {invokeCommand: ic, helptext: ht};
}
module.exports.addCommand = addCommand;


function removeCommand(name){
    if(_.has(_commands,name)){
        delete _commands[name];
    }
}
module.exports.removeCommand = removeCommand;


function isCommandFormatted(s){
    return typeof(s) === 'string' && s.trim().startsWith(config.discord.prefix)
}


function processCommand(message) {
    if(!isCommandFormatted(message.content)){
        return;
    }
    console.debug("Message with command prefix detected");
    let tokenized = message.content.trim()
    .slice(config.discord.prefix.length)
    .split(" ");
    if(tokenized.length >= 1){
        let commandWord = tokenized[0];
        var commandArgs = tokenized.slice(1);
        if(_commands.hasOwnProperty(commandWord)){
            console.debug(`Command ${commandWord} with args ${commandArgs}`);
            return _commands[commandWord].invokeCommand(commandArgs,message);
        }
    }
    return;
}
module.exports.processCommand = processCommand;


addCommand("help",((args,message) => {
    var text = "";
    if(args.length > 0){
        if(_commands.hasOwnProperty(args[0])){
            text += `**${args[0]}**
            ${_commands[args[0]].helptext} `;
        }
        else{
            text += `No such command: $(args[0])`
        }
    }
    text += `\n Available commands: ${_.keys(_commands).sort().join(", ")}`;
    return text;
}), "Display this message");


addCommand("spela",(args,message) => {
    if(args.length < 1){
        return "Anv: !spela <spel>";
    }
    if(message.channel.type != 'text' && !message.guild){
        return "Kommandot !spela funkar bara i vanliga textkanaler";
    }
    let spel = args[0];
    let role = _.find(message.guild.roles,(r => {r.name.toLowerCase() == `spela ${spel}`.toLowerCase()}));
    if(role){
        message.member.addRole(role,`La till rollen ${role.name} på begäran av användaren`)
        .then(console.log)
        .catch(console.err);
        return `Grattis, du är nu tillagd i spela ${spel}`;
    }else{
        let names = _.map(message.guild.roles.array(),r => r.name)
            .filter(s=>s.startsWith("spela"))
            .join(", ");
        return `Tyvärr finns inte ${spel} som pingningsbar roll (än),
        kontakta en administratör för att få det fixat. 
        Roller som finns för tillfället: ${names}`;
    }
    
}, `Anv: !spela <spel> tex. spela CS. Lägger till dig i rollen för spelet för att kommunicera till
andra att du är intresserad av att spela spelet.`);


addCommand("sluta",(args,message)=>{
    if(args.length < 1){
        return "Anv: !sluta <spel>";
    }
    if(message.channel.type != 'text' && !message.guild){
        return "Kommandot !spela funkar bara i vanliga textkanaler";
    }
    let spel = args[0];
    let role = message.guild.roles.find(r => {r.name.toLowerCase() == `spela ${spel}`.toLowerCase()});
    message.member.removeRole()
}, "Anv: !sluta <spel>. Gå ur rollen för <spel>")