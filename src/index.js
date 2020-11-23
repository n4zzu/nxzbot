require("dotenv").config();

const { Client, MessageEmbed } = require('discord.js');

const Discord = require("discord.js");
const client = new Discord.Client();

client.on("connect", () => {
    console.log("TEST");
});

client.on('message', message => {
    let args = message.content.substring(process.env.PREFIX.length).split(" ")

    if(!message.content.startsWith(process.env.PREFIX)) return;
    if(message.author.bot) return;

    switch(args[0]){
        case 'ping':
            message.channel.send('Pong. :ping_pong:')
            break;
    }
})

client.login(process.env.TOKEN.toString());