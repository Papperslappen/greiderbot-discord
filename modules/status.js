var _ = require('lodash');

const statuses = [
  "känner en bot",
  "I väntan på nästa OS",
  "Allan",
  "har inte så många förhoppningar",
  "dagarna är som små sekel",
  "ringsaka rangsaka ringsaksa",
  "limma skinkbit, roligt",
  "Piano",
  "spelar spelar spelar",
  "Aj aj aj, Rastapopoulos"
];

function setRandomStatus(client){
  var status = _.sample(statuses);
  client.user.setActivity(status);
  console.log("Status set to: " + status);
}

function init(client){
  client.on('ready', () => {
    setRandomStatus(client);
  });
}

module.exports.init = init;
