const commando = require('discord.js-commando');
const config = require('./config.js');
const path = require('path');
const sqlite = require('sqlite');
const client = new commando.Client({
    owner: config.discord.bot_owner,
    commandPrefix: config.discord.command_prefix,
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
    });

client.setProvider(
    sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new commando.SQLiteProvider(db))
).catch(console.error);

client.registry
    .registerDefaults()
    .registerGroup('annat','Annat')
    .registerTypesIn(path.join(__dirname, 'types'))
	.registerCommandsIn(path.join(__dirname, 'commands'));

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