require("dotenv").config();

const {
    Client,
    MessageEmbed
} = require('discord.js');

const Discord = require("discord.js");
const client = new Discord.Client();
const Util = require("./utils");
const consoleName = "[sneek.cc] ";
const theme = '#FFBCE6';

function mention_to_id(raw) {
    const a = Array.from(raw).slice(2);
    a.pop();
    return a.join("");
}

client.on("ready", () => {
    console.log(consoleName + 'established connection to discord.\n' + consoleName + 'startup sucessful!');
});

client.on('message', message => {
    let args = message.content.substring(process.env.PREFIX.length).split(" ");

    if (!message.content.startsWith(process.env.PREFIX)) return;
    if (message.author.bot) return;
    const user = message.mentions.users.first();

    switch (args[0]) {
        case 'resethwid':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.delete();
                message.reply('You do not have permissions to use the resethwid command!')
            } else {
            if (args[1] === undefined) {
                message.delete();
                message.channel.send('You need to specify a user to reset their hwid!');
            } else {
                message.channel.send('Reset ' + args[1] + "'s HWID");
            }
        }
        break;
        case 'addsub':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.delete();
                message.reply('You do not have permissions to use the addsub command!')
            } else {
            if (!args[2]) {
                message.delete();
                message.channel.send('Incorrect syntax\nUsage - ' + process.env.PREFIX + 'addsub <user> <time in days>');
            } else {
                message.channel.send('Added ' + args[2] + ' day(s) to ' + args[1] + "'s sub time");
            }
        }
        break;
        case 'removesub':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.delete();
                message.reply('You do not have permissions to use the removesub command!')
            } else {
            if (!args[2]) {
                message.delete();
                message.channel.send('Incorrect syntax\nUsage - ' + process.env.PREFIX + 'removesub <user> <time in days>');
            } else {
                message.channel.send('Removed ' + args[2] + ' day(s) from ' + args[1] + "'s sub time");
            }
        }
        break;
        case 'info':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.delete();
                message.reply('You do not have permissions to use the removesub command!')
            } else {
                if (!args[1]) {
                    message.delete();
                    message.channel.send('Please specify a user to grab info from!');
                } else {
                    const embed = new MessageEmbed()
                    .setTitle(args[1] + "'s user info")
                    .setDescription('Info here')
                    .setColor(theme)
                    .setFooter('sleek.cc')
                message.channel.send(embed);
                }
            }
        break;
    }
})


client.login(process.env.TOKEN.toString());