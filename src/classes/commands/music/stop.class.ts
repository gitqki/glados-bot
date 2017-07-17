export class Stop {
    constructor() {

    }
    stop(msg, CONFIG) {
        if (msg.content.startsWith(CONFIG.prefix + "stop")) { // every command that starts with the prefix and "play"
            const voiceChannel = msg.member.voiceChannel;
            if (!voiceChannel){ // if user is not in voicechannel, don't play
                return msg.channel.send(":x: You must be in a voice channel first!");
            }
            voiceChannel.leave();
        }
    }
}