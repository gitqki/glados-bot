export class Stop {
    constructor() {

    }
    stop(msg, CONFIG, ytSongQueue, ytAudioQueue) {
        if (msg.content.startsWith(CONFIG.prefix + "stop")) {

            const voiceChannel = msg.member.voiceChannel;
            if (!voiceChannel){ // if user is not in voicechannel, don't play
                return msg.channel.send(":x: You must be in a voice channel first!");
            }
            voiceChannel.leave();
            ytAudioQueue.length = 0;
            ytSongQueue.length = 0;

        }
    }
}