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
            case 'dicksize':
            message.delete();
            const dickSizeArray = [
                '8=D',
                '8==D',
                '8===D',
                '8====D',
                '8=====D',
                '8======D',
                '8=======D',
                '8========D',
                '8=========D',
                '8==========D',
                '8===========D',
                '8============D',
                'Nice vag retard'
            ]
            const RandomDickSize = Math.floor(Math.random() * dickSizeArray.length);
            if (args[1] === undefined) {
                message.reply(' Your dick size is: ' + dickSizeArray[RandomDickSize]);
            } else {
                (args[1]);
                message.channel.send(`${Util.make_mention(Util.mention_to_id(args[1]))} Your dick size is:  ` + dickSizeArray[RandomDickSize])
            }
            break;
        case '8ball':
            const ballArray = [
                'Yes',
                'Of course',
                'Indeed',
                'I think so',
                'Possibly',
                'Maybe',
                "I'm not sure",
                "I don't know",
                'Maybe not',
                "I don't think so",
                'Possibly not',
                'No',
                'Of course not',
                'Not a chance'
            ]
            const randomBallAnswer = Math.floor(Math.random() * ballArray.length);
            if (args[1] === undefined) {
                message.reply(' Please ask a question!');
            } else {
                (args[1]);
                message.channel.send(ballArray[randomBallAnswer]);
            }
            break;
        case 'id':
            message.delete();
            if (!args[2]) return message.channel.send('Please specify a user!');
            if (args[2] === "quiet") {
                message.channel.send(`The ID is \`${mention_to_id(args[1])}\``);
            } else {
                message.channel.send(
                    `The ID of ${args[1]} is \`${mention_to_id(args[1])}\``
                );
            }
            break;
        case 'embed':
            message.delete();
            if (!args[2]) return message.channel.send('You need to specify atleast the title and description!\nUsage : ' + process.env.PREFIX + 'embed <title> <description> <colour in hex format (optional)> <image url (optional)>');
            if (args[4]) {
                const embed = new MessageEmbed()
                    .setTitle(args[1])
                    .setDescription(args[2])
                    .setColor(args[3])
                    .setImage(args[4])
                message.channel.send(embed);
            } else {
                if (args[2]) {
                    const embed = new MessageEmbed()
                        .setTitle(args[1])
                        .setDescription(args[2]);
                    message.channel.send(embed);
                }
            }
            break;
        case 'snake':
            message.delete();
            const embedSnake = new MessageEmbed()
                .setTitle('cat snake')
                .setFooter('cat snake')
                .setColor(theme)
                .setImage('https://media.discordapp.net/attachments/775446560694730763/780221513210396682/cet0.gif')
            message.channel.send(embedSnake);
            break;
        case 'hug':
            message.delete();
            if (args[1] === undefined) {
                message.reply(' You need to specify a user to hug!');
            } else {
                const hugArray = [
                    'https://cdn.nekos.life/cuddle/cuddle_040.gif',
                    'https://cdn.nekos.life/hug/hug_031.gif',
                    'https://cdn.nekos.life/hug/hug_045.gif',
                    'https://cdn.nekos.life/hug/hug_006.gif'
                ]

                const randomHug = Math.floor(Math.random() * hugArray.length);
                (args[1]);
                const embedHug = new MessageEmbed()
                    .setTitle('nxzbot hug')
                    .setColor(theme)
                    .setImage(hugArray[randomHug])
                message.reply(`hugged ${Util.make_mention(Util.mention_to_id(args[1]))}`);
                message.channel.send(embedHug);
            }
            break;
        case 'kiss':
            message.delete();
            if (args[1] === undefined) {
                message.reply(' You need to specify a user to kiss!');
            } else {
                const kissArray = [
                    'https://cdn.nekos.life/kiss/kiss_037.gif',
                    'https://cdn.nekos.life/kiss/kiss_090.gif',
                    'https://cdn.nekos.life/kiss/kiss_118.gif',
                    'https://cdn.nekos.life/kiss/kiss_026.gif'
                ]

                const randomKiss = Math.floor(Math.random() * kissArray.length);
                (args[1]);
                const embedKiss = new MessageEmbed()
                    .setTitle('nxzbot kiss')
                    .setColor(theme)
                    .setImage(kissArray[randomKiss])
                message.reply(`kissed ${Util.make_mention(Util.mention_to_id(args[1]))}`);
                message.channel.send(embedKiss);
            }
            break;
        case 'pat':
            message.delete();
            if (args[1] === undefined) {
                message.reply(' You need to specify a user to pat!');
            } else {
                const patArray = [
                    'https://cdn.nekos.life/pat/pat_032.gif',
                    'https://cdn.nekos.life/pat/pat_065.gif',
                    'https://cdn.nekos.life/pat/pat_015.gif',
                    'https://cdn.nekos.life/pat/pat_012.gif'
                ]

                const randomPat = Math.floor(Math.random() * patArray.length);
                (args[1]);
                const embedPat = new MessageEmbed()
                    .setTitle('nxzbot pat')
                    .setColor(theme)
                    .setImage(patArray[randomPat])
                message.reply(`pats ${Util.make_mention(Util.mention_to_id(args[1]))}`);
                message.channel.send(embedPat);
            }
            break;
        case 'slap':
            message.delete();
            if (args[1] === undefined) {
                message.reply(' You need to specify a user to slap!');
            } else {
                const slapArray = [
                    'https://cdn.nekos.life/slap/slap_004.gif',
                    'https://cdn.nekos.life/slap/slap_012.gif',
                    'https://cdn.nekos.life/slap/slap_002.gif',
                    'https://cdn.nekos.life/slap/slap_007.gif'
                ]

                const randomSlap = Math.floor(Math.random() * slapArray.length);
                (args[1]);
                const embedSlap = new MessageEmbed()
                    .setTitle('nxzbot slap')
                    .setColor(theme)
                    .setImage(slapArray[randomSlap])
                message.reply(`slaps ${Util.make_mention(Util.mention_to_id(args[1]))}!`);
                message.channel.send(embedSlap);
            }
            break;
        case 'nigga':
            message.delete();
            message.channel.send('https://tenor.com/view/really-are-you-kidding-me-got-to-be-kidding-youre-kidding-me-seriously-gif-5606205');    
        break;
        case 'help':
            message.delete();
            const embed = new MessageEmbed()
                .setTitle('nxzbot help\nUse ' + process.env.PREFIX + 'help <option>')
                .setColor(theme)
                .setDescription('ping\nclear\nav\nkick\nban\nsay\nhowgay\nhowcute\ndicksize\n8ball\nid\nembed\nsnake\nhug\npat\nslap\nkiss');
            if (!args[1]) return message.channel.send(embed);

            if (args[1] === 'ping') {
                message.channel.send(process.env.PREFIX + 'ping Returns the latency of the bot.');
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