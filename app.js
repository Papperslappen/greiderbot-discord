const commando = require('discord.js-commando');
const config = require('./config');
const path = require('path');
const sqlite = require('sqlite');
const client = new commando.Client({
    owner: config.discord.bot_owner,
    commandPrefix: config.discord.prefix,
    unknownCommandResponse: false,
});

client
    .on('error',console.error)
    .on('warn',console.warn)
    //.on('debug', console.log)
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
client.registry.registerDefaults();

require('./modules/playgroups').init(client);
require('./modules/dicebot').init(client);
//require('./modules/greeter').init(client);
require('./modules/status').init(client);
require('./modules/emotes').init(client);
require('./modules/pension.js').init(client);
require('./modules/mix.js').init(client);

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
