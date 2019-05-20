const commando = require('discord.js');
const config = require('./config.js');
const path = require('path');
const client = new commando.Client({
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
        console.log(message.content);
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