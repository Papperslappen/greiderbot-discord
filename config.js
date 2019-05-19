require('dotenv').config();
var config = {};
config.discord = {};

config.discord.login_token = process.env.DISCORD_LOGIN_TOKEN || "";
config.discord.bot_owner = process.env.DISCORD_BOT_OWNER_ID || "";
config.discord.prefix = process.env.DISCORD_BOT_COMMAND_PREFIX  || "";
module.exports = config;