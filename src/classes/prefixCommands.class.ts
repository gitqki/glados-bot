/*@prefix: ../config/config.json CONFIG.prefix
 *@function: Commands here
 */
export class prefixCommands {
    constructor(){
    }
    public getCommands(msg, CONFIG, helper, fs) {

        if (msg.content.startsWith(CONFIG.prefix + "copy")) {
            var splitMsg = msg.content.split(' ', 2);
            var songName = splitMsg[1];
            msg.guild.channels.find("name", "test").send(songName);
        }

        if (msg.content.startsWith(CONFIG.prefix + "clr")) {
            // Split spaces
            var astr = msg.content.split(' ').pop();
            // Get messages
            if (astr === '1') {
                msg.channel.fetchMessages({
                    limit: 2
                })
                    .then(messages => msg.channel.bulkDelete(2)).then(console.log(helper.gct() + ' - Deleted message from: ' + msg.author.tag + '!'))
                    .catch(console.error);
                setTimeout(() => {
                    msg.channel.send("deleted messages: " + (astr)).then(console.log(helper.gct() + ' - ' + astr + ' deleted message/s from: ' + msg.author.tag + '!'))
                }, 500);
            } else {
                astr = astr++ + 1;
                msg.channel.fetchMessages({
                    limit: astr
                })
                    .then(messages => msg.channel.bulkDelete(astr)).then(console.log(helper.gct() + ' - Deleted message from: ' + msg.author.tag + '!'))
                    .catch(console.error);
                setTimeout(() => {
                    msg.channel.send("deleted messages: " + (astr-- - 1)).then(console.log(helper.gct() + ' - ' + astr + ' deleted message/s from: ' + msg.author.tag + '!'))
                }, 500);
            }
        }

        // Let user change the Prefix and write it into json
        if (msg.content.startsWith(CONFIG.prefix + "prefix")) {
            let newPrefix = msg.content.split(" ").slice(1, 2)[0];
            CONFIG.prefix = newPrefix;
            msg.delete().then(msg => console.log(helper.gct() + ' - ' + msg.author.tag + ' changed Prefix to "' + newPrefix + '"'));
            msg.reply('Prefix is now "' + newPrefix + '"');
            fs.writeFile("../config/config.json", JSON.stringify(CONFIG), (err) => console.error);
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
                "\n4. " + CONFIG.prefix + "copy, let you copy the text after 'copy' to other channel (#test textchannel)" +
                "\n4. autodelete for: play-messages with prefix '" + CONFIG.hime + "'" +
                "\n5. autodelete for: queue-messages with prefix '" + CONFIG.hime + "'" +
                "\n6. autodelete for: skip-messages with prefix '" + CONFIG.hime + "'" +
                "\n7. autodelete for: forceskip-messages with prefix '" + CONFIG.hime + "'" +
                "\n8. autodelete for: stop-messages with prefix '" + CONFIG.hime + "'" +
                "\n9. autodelete for: resume-messages with prefix '" + CONFIG.hime + "'" +
                "\n10. autodelete for: pause-messages with prefix '" + CONFIG.hime + "'" +
                "\n11. autodelete for: current-messages with prefix '" + CONFIG.hime + "'" +
                CONFIG.format + '\n'
            ).then(msg => console.log(helper.gct() + ' - Sent a reply to: ' + msg.author)).catch(console.error)
        }
    }
}