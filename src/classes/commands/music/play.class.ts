import search = require("youtube-search");
import {YoutubeSearch} from "./search.class";

export class Play {
    constructor() {

    }
    play(msg, client, ytdl, CONFIG) {
            if (msg.content.startsWith(CONFIG.prefix + "play")) { // every command that starts with the prefix and "play"
                const voiceChannel = msg.member.voiceChannel;
                if (!voiceChannel){ // if user is not in voicechannel, don't play
                    return msg.channel.send(":x: You must be in a voice channel first!");
                }
                voiceChannel.join()
                    .then(connection => { // else play the song
                        const args = msg.content.split(" ").slice(1);
                        let stream = ytdl(args.join(" "), {audioonly: true});
                        let dispatcher = connection.playStream(stream);
                        ytdl.getInfo(args.join(" "), function(err, info) {
                            const title = info.title
                            console.log(`${msg.author.username}, Queued the song '${title}.'`)
                            msg.channel.send(`Now playing \`${title}\``)
                        })
                        dispatcher.on('end', () => { // leave voicechat when finished
                            voiceChannel.leave();
                        });
                    })
            }
    }
}
