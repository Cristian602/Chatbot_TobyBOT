// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const dialogflow = require('./dialogflow');

venom
  .create({
    session: 'session-name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
    let payload = await dialogflow.sendToDialogFlow(message.body,"123123");
    let responses = payload.fulfillmentMessages;
    for (const response of responses) {
      client
        .sendText(message.from, response.text.text[0])
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
    
  });
}