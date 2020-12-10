require("dotenv").config();

const {
    Client,
    MessageEmbed
} = require('discord.js');

const Discord = require("discord.js");
const client = new Discord.Client();
const Util = require("./utils");
const consoleName = "[nxzbot] ";
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
        case "ping":
            message.delete();
            message.channel.send(`:ping_pong: Pong! That took ${message.createdTimestamp - Date.now()} ms.`);
            break;
        case 'clear':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.delete();
                message.reply('You do not have permissions to use the clear command!');
            } else {
                message.delete();
                if (!args[1]) return message.channel.send('Please specify how many messages you would like to clear!');
                if (isNaN(args[1])) return message.channel.send(`${args[1]} is not a number!`);
                if (args[1] > 100) return message.channel.send('Please specify a number under 100!');
                message.channel.bulkDelete(args[1]);
                message.channel.send(`Cleared ${args[1]} message(s)`);
            }
            break;
        case 'av':
            message.delete();
            //message.reply(message.author.displayAvatarURL());
            const user = message.mentions.users.first() || message.author;
            const avatarEmbed = new MessageEmbed()
                .setColor(theme)
                .setAuthor(user.username + "'s avatar")
                .setImage(user.avatarURL({
                    dynamic: true,
                    size: 1024
                }))
            message.channel.send(avatarEmbed);
            //message.channel.send(user.avatarURL({dynamic:true}));
            break;
        case 'kick':
            //const user = message.mentions.users.first();
            // If we have a user mentioned
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.delete();
                message.reply('You do not have permissions to use the kick command!')
            } else {
                if (user) {
                    // Now we get the member from the user
                    const member = message.guild.member(user);
                    // If the member is in the guild
                    if (member) {
                        /**
                         * Kick the member
                         * Make sure you run this on a member, not a user!
                         * There are big differences between a user and a member
                         */
                        member
                            .kick('Optional reason that will display in the audit logs')
                            .then(() => {
                                // We let the message author know we were able to kick the person
                                message.channel.send(`Successfully kicked ${user.tag}`);
                            })
                            .catch(err => {
                                // An error happened
                                // This is generally due to the bot not being able to kick the member,
                                // either due to missing permissions or role hierarchy
                                message.channel.send('I was unable to kick the member');
                                // Log the error
                                console.error(err);
                            });
                    } else {
                        // The mentioned user isn't in this guild
                        message.channel.send("That user isn't in this guild!");
                    }
                    // Otherwise, if no user was mentioned
                } else {
                    message.channel.send("You didn't mention the user to kick!");
                }
                message.delete();
            }
            break;
        case 'ban':
            //const user = message.mentions.users.first();
            // If we have a user mentioned
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.delete();
                message.reply('You do not have permissions to use the ban command!')
            } else {
                if (user) {
                    // Now we get the member from the user
                    const member = message.guild.member(user);
                    // If the member is in the guild
                    if (member) {
                        /**
                         * Ban the member
                         * Make sure you run this on a member, not a user!
                         * There are big differences between a user and a member
                         * Read more about what ban options there are over at
                         * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
                         */
                        member
                            .ban({
                                reason: 'They were bad!',
                            })
                            .then(() => {
                                // We let the message author know we were able to ban the person
                                message.channel.send(`Successfully banned ${user.tag}`);
                            })
                            .catch(err => {
                                // An error happened
                                // This is generally due to the bot not being able to ban the member,
                                // either due to missing permissions or role hierarchy
                                message.channel.send('I was unable to ban the member');
                                // Log the error
                                console.error(err);
                            });
                    } else {
                        // The mentioned user isn't in this guild
                        message.channel.send("That user isn't in this guild!");
                    }
                } else {
                    // Otherwise, if no user was mentioned
                    message.channel.send("You didn't mention the user to ban!");
                }
                message.delete();
            }
            break;
        case 'say':
            message.delete();
            if (!args[1]) return message.reply(`I can't say nothing you spastic cunt.`);
            let say = args.splice(1).join(" ");
            message.channel.send(say);
            break;
        case 'howgay':
            message.delete();
            if (args[1] === undefined) {
                message.reply(
                    ` You're ${Math.floor(Math.random() * 100)}% gay :rainbow:`
                );
            } else {
                (args[1]);
                message.channel.send(`${Util.make_mention(Util.mention_to_id(args[1]))} You're ${Math.floor(Math.random() * 100)}% gay :rainbow:`);
            }
            break;
        case "howcute":
            message.delete();
            if (args[1] === undefined) {
                message.reply(
                    ` You're ${Math.floor(Math.random() * 100)}% cute :cherry_blossom:`
                );
            } else {
                (args[1]);
                message.channel.send(`${Util.make_mention(Util.mention_to_id(args[1]))} You're ${Math.floor(Math.random() * 100)}% cute :cherry_blossom:`);
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
            } else {
                if (args[1] === 'clear') {
                    message.channel.send(process.env.PREFIX + 'clear Clears a certain amount of messages.\nUsage: ' + process.env.PREFIX + 'clear <amount of messages to clear>');
                } else {
                    if (args[1] === 'av') {
                        message.channel.send(process.env.PREFIX + 'av Shows your or another users avatar.');
                    } else {
                        if (args[1] === 'kick') {
                            message.channel.send(process.env.PREFIX + 'kick will kick a user from the server.\nUsage : ' + process.env.PREFIX + 'ban <user> <reason (optional)>\nRequired permissions : Admin.')
                        } else {
                            if (args[1] === 'ban') {
                                message.channel.send(process.env.PREFIX + 'ban will ban a user from the server.\nUsage : ' + process.env.PREFIX + 'ban <user> <reason (optional)>\nRequired permissions : Admin.')
                            } else {
                                if (args[1] === 'say') {
                                    message.channel.send(process.env.PREFIX + 'say replies with the message you send.\nUsage : ' + process.env.PREFIX + 'say <message>')
                                } else {
                                    if (args[1] === 'howgay') {
                                        message.channel.send(process.env.PREFIX + 'howgay shows how gay you or another user are.\nThis is 100% accurate (most of the time).')
                                    } else {
                                        if (args[1] === 'howcute') {
                                            message.channel.send(process.env.PREFIX + 'howcute shows how cute you or another user are.')
                                        } else {
                                            if (args[1] === 'dicksize') {
                                                message.channel.send(process.env.PREFIX + 'dicksize shows how big your or another users dick is.')
                                            } else {
                                                if (args[1] === '8ball') {
                                                    message.channel.send(process.env.PREFIX + '8ball gives you 100% accurate answers to your questions.')
                                                } else {
                                                    if (args[1] === 'id') {
                                                        message.channel.send(process.env.PREFIX + 'id returns a users id.\nUsage : ' + process.env.PREFIX + 'id <user> <quiet (optionsl)>')
                                                    } else {
                                                        if (args[1] === 'embed') {
                                                            message.channel.send(process.env.PREFIX + 'embed generates a custom embed.\nUsage : ' + process.env.PREFIX + 'embed <title> <description> <colour in hex format (optional)> <image url (optional)>')
                                                        } else {
                                                            if (args[1] === 'snake') {
                                                                message.channel.send(process.env.PREFIX + 'snake returns snake.')
                                                            } else {
                                                                if (args[1] === 'hug') {
                                                                    message.channel.send(process.env.PREFIX + 'hug hugs a user.')
                                                                } else {
                                                                    if (args[1] === 'pat') {
                                                                        message.channel.send(process.env.PREFIX + 'pat pats a user.')
                                                                    } else {
                                                                        if (args[1] === 'slap') {
                                                                            message.channel.send(process.env.PREFIX + 'slap slaps a user.')
                                                                        } else {
                                                                            if (args[1] === 'kiss') {
                                                                                message.channel.send(process.env.PREFIX + 'kiss kisses a user.')
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            break;
    }
})


client.login(process.env.TOKEN.toString());