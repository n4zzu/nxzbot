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
            message.channel.send(
                `:ping_pong: Pong! That took ${
          message.createdTimestamp - Date.now()
         } ms.`
            );
            break;
        case 'clear':
            if (!message.member.hasPermission('ADMINISTRATOR')) {
                message.delete();
                message.reply('You do not have permissions to use the clear command!')
            } else {
                message.delete();
                if (!args[1]) return message.channel.send('Please specify how many messages you would like to clear!');
                if (isNaN(args[1])) return message.channel.send(`${args[1]} is not a number!`);
                message.channel.bulkDelete(args[1]);
                message.channel.send(`Cleared ${args[1]} message(s)`);
            }
            break;
        case 'av':
            message.delete();
            message.reply(message.author.displayAvatarURL());
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
        case 'echo':
            message.delete();
            if (!args[1]) return message.reply(`I can't echo nothing you spastic cunt.`);
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
            if (!args[3]) return message.channel.send('You need to specify a title, the colour in hex format and the description!');
            if (args[3]) {
                const embed = new MessageEmbed()
                    .setTitle(args[1])
                    .setColor(args[2])
                    .setDescription(args[3]);
                message.channel.send(embed);
            }
            break;
        case 'help':
            message.delete();
            const embed = new MessageEmbed()
                    .setTitle('nxzbot help\nUse ' + process.env.PREFIX + 'help <option>')
                    .setColor(theme)
                    .setDescription('ping\nclear\nav\nkick\nban\necho\nhowgay\nhowcute\ndicksize\nid\nembed');
                if (!args[1]) return message.channel.send(embed);

                if (args[1] === 'ping') {
                    const embed = new MessageEmbed()
                    .setTitle('nxzbot help\nping')
                    .setColor(theme)
                    .setDescription('Returns the latency of the bot.');
                message.channel.send(embed);
                } else {
                    if (args[1] === 'clear') {
                    const embed = new MessageEmbed()
                    .setTitle('nxzbot help\nclear')
                    .setColor(theme)
                    .setDescription('Clears a certain amount of messages.\nUsage: ' + process.env.PREFIX + 'clear <amount of messages to clear>');
                    message.channel.send(embed);
                    } else {
                    if (args[1] === 'av') {
                        const embed = new MessageEmbed()
                        .setTitle('nxzbot help\nAv')
                        .setColor(theme)
                        .setDescription('Shows your avatar.');
                        message.channel.send(embed);
                    }
                }
            }
    }
})


client.login(process.env.TOKEN.toString());