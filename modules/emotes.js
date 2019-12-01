module.exports = {
    init: function(client){
        client.on('messageReactionAdd',(reaction,user)=>{
          if(reaction.emoji.name === "greiderbot" || reaction.emoji.name === "🐊" && !reaction.me){
            console.log(`detected emoji: ${reaction.emoji.name}`);
            reaction.message.react(reaction.emoji);
          }
        });
    },
};
