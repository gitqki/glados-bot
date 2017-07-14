/**
@Author: Stefan Behnert, Thien-An Nguyen
@Version: 0.1.2
@date: 13.07.2017
@email:
*
------
Start
------
@run: node super-clean-bot.js >action-log.txt 2>error-log.txt
=> action-log will display console.log outputs
=> error-log will display all errors
*
-----------
Definitions
-----------
@gct = getCurrentTimestamp
@...
*
**/


import {} from "fs";
import {} from '../config.json';
import {Helper} from "./classes/helper.class.ts";
import {} from "./classes/bootstrap.class.ts";
import * as Discord from "discord.js";
const client = new Discord.Client();

// Create ready event listener
client.on('ready', () => {
    console.log('Logged in as: ' + client.user.tag + '!');
});

// Create message listener
client.on('message', msg => {

    // Prevents bots are calling other bot statements, which will end in infinite loop
    // We need this function actually, because we want to delete self-statements after using "clr"-command
    // need workaround
    // if (msg.author.bot) return;

    // Let user change the Prefix and write it into json
    if (msg.content.startsWith(CONFIG.prefix + "prefix")) {
        let newPrefix = msg.content.split(" ").slice(1, 2)[0];
        CONFIG.prefix = newPrefix;
        msg.delete().then(msg => console.log(Helper.gct() + ' - ' + msg.author.tag + ' changed Prefix to "' + newPrefix + '"'));
        msg.reply('Prefix is now "' + newPrefix + '"');
        fs.writeFile("./config.json", JSON.stringify(CONFIG), (err) => console.error);
    }
    /*@prefix: no prefix here
     *@function: Conversation Statements
     */

	if (msg.content === 'Was geht?') {
        msg.reply('Alles, was Beine hat!');
    }

    /*@prefix: config.json CONFIG.prefix
     *@function: Commands here
     */

    if (msg.content.startsWith(CONFIG.hime + "play") || msg.content === CONFIG.hime + 'stop' || msg.content === CONFIG.hime + 'resume' ||
        msg.content === CONFIG.hime + 'pause' || msg.content === CONFIG.hime + 'current') {

        // Delete message
        msg.delete()
            .then(msg => console.log(Helper.gct() + ' - Autodelete'))
            .catch(console.error);

    }
    if (msg.content.startsWith(CONFIG.hime + "skip") || msg.content.startsWith(CONFIG.hime + "forceskip")) {
        const timeStamp = msg.createdTimestamp;
        // Delete message
        msg.delete()
            .then(msg => console.log(Helper.gct() + ' - Autodelete'))
            .catch(console.error);

    }
    if (msg.content.startsWith(CONFIG.hime + "queue")) {
        // Delete message
        msg.delete()
            .then(msg => console.log(Helper.gct() + ' - Autodelete'))
            .catch(console.error);
    }

    if (msg.content.startsWith(CONFIG.prefix + "clr")) {
        // Split spaces
        astr = msg.content.split(' ').pop();
        // Get messages
        if (astr === '1') {
            msg.channel.fetchMessages({
                    limit: 2
                })
                .then(messages => msg.channel.bulkDelete(2)).then(console.log(Helper.gct() + ' - Deleted message from: ' + msg.author.tag + '!'))
                .catch(console.error);
            setTimeout(() => {
                msg.channel.send("deleted messages: " + (astr)).then(console.log(Helper.gct() + ' - ' + astr + ' deleted message/s from: ' + msg.author.tag + '!'))
            }, 500);
        } else {
            astr = astr++ + 1;
            msg.channel.fetchMessages({
                    limit: astr
                })
                .then(messages => msg.channel.bulkDelete(astr)).then(console.log(Helper.gct() + ' - Deleted message from: ' + msg.author.tag + '!'))
                .catch(console.error);
            setTimeout(() => {
                msg.channel.send("deleted messages: " + (astr-- - 1)).then(console.log(Helper.gct() + ' - ' + astr + ' deleted message/s from: ' + msg.author.tag + '!'))
            }, 500);
        }
    }

    if (msg.content.startsWith("deleted messages")) {
        setTimeout(() => {
            msg.delete()
                .then(msg => console.log(Helper.gct() + ' - Autodelete'))
                .catch(console.error);
        }, 5000);
    }


    if (msg.content === CONFIG.prefix + 'avatar') {
        // Send the user's avatar URL
        if (msg.author.avatarURL === undefined || msg.author.avatarURL === null) {
            // Default
            msg.reply("Default. For real, biatch!?\n");
            msg.reply(msg.author.defaultAvatarURL);
        } else {
            // User Avatar
            msg.reply(msg.author.avatarURL);
        }
    }

    if (msg.content === CONFIG.prefix + "commands") {
        // List commands @output
        msg.channel.send(
            CONFIG.format +
            "py\n Supported commands\n====================\n1. " + CONFIG.prefix + "clr + number (max:99) -> Delete messages with a specific number" +
			"\n2. " + CONFIG.prefix + "avatar, shows the users avatar" +
			"\n3. " + CONFIG.prefix + "prefix, change current prefix" +
            "\n4. autodelete for: play-messages with prefix '" + CONFIG.hime + "'" +
            "\n5. autodelete for: queue-messages with prefix '" + CONFIG.hime + "'" +
			"\n6. autodelete for: skip-messages with prefix '" + CONFIG.hime + "'" +
			"\n7. autodelete for: forceskip-messages with prefix '" + CONFIG.hime + "'" +
			"\n8. autodelete for: stop-messages with prefix '" + CONFIG.hime + "'" +
			"\n9. autodelete for: resume-messages with prefix '" + CONFIG.hime + "'" +
			"\n10. autodelete for: pause-messages with prefix '" + CONFIG.hime + "'" +
			"\n11. autodelete for: current-messages with prefix '" + CONFIG.hime + "'" +
            CONFIG.format + '\n'
        ).then(msg => console.log(Helper.gct() + ' - Sent a reply to: ' + msg.author)).catch(console.error)
    }
});

client.login(process.env.BOT_TOKEN);
