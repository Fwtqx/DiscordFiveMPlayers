const express = require('express')
const moment = require('moment');
const cron = require('node-cron');
const Discord = require('discord.js');
const https = require('https');

const app = express()
app.set('view engine', 'pug');
moment.locale('fr');

const TOKEN_BOT = 'TOKEN OF YOUR BOT DISCORD';
const ID_SERVER_FIVEM = 'ID OF YOUR SERVER FIVEM';

const withChannel = false;
const ID_CHANNEL_PLAYERS = 'ID OF YOUR CHANNEL';

const PORT = process.env.PORT || 3000;

async function getInfos() {
    try {

        const client = new Discord.Client({intents: [Discord.Intents.FLAGS.GUILDS]});

        client.on("ready", async () => {
            console.log('BOT DISCORD CONNECTED AND STARTED...');
           
            https.get({
                hostname: 'servers-frontend.fivem.net',
                path: `/api/servers/single/${ID_SERVER_FIVEM}`,
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36' }
            }, res => {
                if (res.statusCode !== 200) {
                    console.log('FIVEM ERROR GET INFORMATIONS... RETRY LATER');
                    console.error(`Did not get an OK from the server. Code: ${res.statusCode}`);
                    res.resume();
                    return;
                }
                let data = '';

                res.on('data', (chunk) => {
                  data += chunk;
                });
              
                res.on('close', () => {
                  console.log('INFORMATIONS OF SERVER RECEIVED...');
                  data = JSON.parse(data);
                  const players = data.Data.clients;
                  const maxPlayers = data.Data.svMaxclients;

                /**
                 * SET NUMBER OF PLAYERS INTO NAME CHANNEL DISCORD
                 **/
                if(withChannel){
                    client.channels.fetch(ID_CHANNEL_PLAYERS).then(channel => {
                        console.log('SET NEW NAME WITH PLAYERS ON CHANNEL NAME...');
                        channel.setName(`Joueurs: ${players}/${maxPlayers}`);
                        console.log(`JOUEURS: ${players}/${maxPlayers}`);
                    });
                }
                
                /**
                 * SET NUMBER OF PLAYERS IN ACTIVITY BOT
                 * COMMENT/DECOMMENT LINES TO USE IT
                 **/
                client.user.setStatus('online');
                client.user.setActivity(`${players}/${maxPlayers} Joueurs`);

                });
            });
           
        });
        client.login(TOKEN_BOT);
    } catch (error) {
        console.log(error);
    }
}

app.get('/', async (req, res) => { //get method
    res.render('index');
});

app.get('/health', (req, res) => {
    res.status(200).send();
});

app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await getInfos();

    cron.schedule('*/2 * * * *', async () => {
        await getInfos();
    });
});

