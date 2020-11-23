require("dotenv").config();

const { Client, MessageEmbed } = require('discord.js');

const Discord = require("discord.js");
const client = new Discord.Client();
const consoleName = "[nxzbot] ";
const messageName = "[nxzbot] \n"

client.on("ready", () => {
    console.log(consoleName + 'established connection to discord.\n' + consoleName + 'startup sucessful!');
});

client.on('message', message => {
    let args = message.content.substring(process.env.PREFIX.length).split(" ");

    if(!message.content.startsWith(process.env.PREFIX)) return;
    if(message.author.bot) return;

    switch(args[0]){
        case 'ping':
            message.channel.send(messageName + 'Pong. :ping_pong:');
            break;
        case 'clear':
            if(!args[1]) return message.channel.send(messageName + 'Please specify how many messages you would like to clear!');
            if(isNaN(args[1])) return message.channel.send(messageName + `${args[1]} is not a number!`);
            message.channel.bulkDelete(args[1]);
            message.channel.send(`Cleared ${args[1]} message(s)`);
            break;
        case 'av':
            message.reply(message.author.displayAvatarURL());
            break;
    }
})

client.login(process.env.TOKEN.toString());