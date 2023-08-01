# Discord Players FiveM

Small nodeJS script allowing to change the name of a channel with the number of current players playing on your server!

No need for the players.json file or anything else, the script does not use the FiveM server but the FiveM link so
nothing needs to be changed on the GTA server side.

## Prerequisites

- Node server or Node Local with version > 16.x

## How To Use

1. Clone this project into a folder on your machine or on your node server


2. execute 'npm install' to install dependencies of this project


3. Configure and Invite the bot to your server:
    - If you say how to work => [Discord Developer Portal](https://discord.com/developers/applications)
    - If not
      => [How to create a bot ?](https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token)


4. In the file 'index.js' at the top change this variables :

![Varaible](./img/variables.png)


You have 2 possibilities to display the number of players,

Either as an activity under the bot

![Variable](./img/players.png)

And you also have the possibility to activate the same to display the number of players in the name of a voice channel

![Variable](./img/players_2.png)


if you want the first result only, just fill in the following variables:

- TOKEN_BOT => bot token
- ID_SERVER_FIVEM => This is the end of the server url ! example with https://servers.fivem.net/servers/detail/ID_EXAMPLE with this url it would be ID_EXAMPLE


If you also want the option with the voice channel, you must fill in the other 2 variables:

- withChannel => switch to true
- ID_CHANNEL_PLAYERS => Enter the identifier of the channel where you want the number of players to appear (if you do
  not know how to copy the identifier, you must put yourself in developer mode on discord and right click on the channel
  then copy the identifier )

7. Start script with 'node index.js'


8. Enjoy !

VIDEO TUTORIAL & EXAMPLE

![Variable](./img/video.mp4)