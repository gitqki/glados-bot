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
----------------------------------------------
Commands / Util
----------------------------------------------

1. ${CONFIG.prefix}avatar - shows the users avatar
2. ${CONFIG.prefix}prefix, change current prefix
3. ${CONFIG.prefix}copy, let you copy the text after 'copy' to other channel (#test textchannel)

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
"Do it!",
"Do it",

********************
        TTS
********************

"gg ez",
"are you gay?"

----------------------------------------------
Music
----------------------------------------------

1. ${CONFIG.prefix}add - url or keyword
2. ${CONFIG.prefix}play - url or keyword
3. ${CONFIG.prefix}resume 
4. ${CONFIG.prefix}stop
1. ${CONFIG.prefix}skip

----------------------------------------------
Autodelete
----------------------------------------------

1. Autodelete own messages, and play messages to avoid spam in chat
2. Autodelete himeBot messages, and play messages to avoid spam in chat

- Current index: 
play-messages
queue-messages
skip-messages
forceskip-messages
stop-messages
resume-messages 
pause-messages 
current-messages

${CONFIG.format}
                `
            ).then(msg => console.log(helper.gct() + ' - Sent a reply to: ' + msg.author)).catch(console.error)
        }
    }
}