const discord = require('discord.js');
const config = require('./config');
const path = require('path');
const commands = require('./modules/commands')
const client = new discord.Client({
    owner: config.discord.bot_owner,
});

client
    .on('error',console.error)
    .on('warn',console.warn)
    .on('debug', console.log)
    .on('disconnect', () => { console.warn('Disconnected!'); })
	.on('reconnecting', () => { console.warn('Reconnecting...'); })
    .on('ready', () => {
        console.log(`Logged in as ${client.user.tag}!`);
        console.log(`Connected to guilds [${client.guilds.map(v => { return v.name })}]`);
    })
    .on('rateLimit', (rateLimitInfo) => {
        console.log(`WARNING! Rate limit Path: ${rateLimitInfo.path}`);
    })
    .on('message',(message) => {
        let result = commands.processCommand(message);
        if(result){
            message.reply(result)
            .then(m => {console.log(m.content)})
            .catch(console.error);

          //  message.delete()
          //  .then(console.log)
          //  .catch(console.error);
        }

    });


function main() {
    console.log("Starting Bot");
    if (!config.discord.login_token) {
        console.log("login token not set");
        process.exit(1);
    }
    console.log("Logging in");
    client.login(config.discord.login_token);
}

main();