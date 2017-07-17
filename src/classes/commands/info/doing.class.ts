export class Doing {
    constructor() {}
    getCommands(msg, CONFIG, helper) {
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
                `
${CONFIG.format_start}
1. autodelete for: play-messages with prefix "${CONFIG.hime}"
2. autodelete for: queue-messages with prefix "${CONFIG.hime}"
3. autodelete for: skip-messages with prefix "${CONFIG.hime}"
4. autodelete for: forceskip-messages with prefix "${CONFIG.hime}"
5. autodelete for: stop-messages with prefix "${CONFIG.hime}"
6. autodelete for: resume-messages with prefix "${CONFIG.hime}"
7. autodelete for: pause-messages with prefix "${CONFIG.hime}"
8. autodelete for: current-messages with prefix "${CONFIG.hime}"
9. ${CONFIG.prefix}avatar - shows the users avatar
10. ${CONFIG.prefix}prefix, change current prefix
11. ${CONFIG.prefix}play + song-url - Will play youtube url
12. ${CONFIG.prefix}copy, let you copy the text after 'copy' to other channel (#test textchannel)

----------------------------------------------
Soundboard
----------------------------------------------

@someone +
"The cake is a lie",
"You need more companion cubes",
"Bot no good",
"Nay",
"Yay",
"Stop it",
"Do it!"
${CONFIG.format}
                `
            ).then(msg => console.log(helper.gct() + ' - Sent a reply to: ' + msg.author)).catch(console.error)
        }
    }
}