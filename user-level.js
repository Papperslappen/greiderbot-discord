import { discord } from "./config";

function user_level(user,guild){
    if(user.tag == discord.bot_shepard){
        return 100;
    }
    return 0;
}