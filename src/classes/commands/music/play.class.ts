import search = require("youtube-search");

export class Play {
    constructor() {

    }
    play(msg, CONFIG, ytdl, ytSongQueue, client, dispatcher, userRole) {
        const voiceChannel = msg.member.voiceChannel;
        const args2 = msg.content.split(" ");
        const args3 = args2[0].length;
        const args = msg.content.slice(args3);
        const streamOptions = {seek: 0, volume: 1};
        if (msg.content.startsWith(CONFIG.prefix + "play")) {ytSeach(msg, args);}
        else if (msg.content.startsWith(CONFIG.prefix + "resume")) {voiceChannel.leave();resumeSong(msg, ytSongQueue[0]);}
        else if (msg.content.startsWith(CONFIG.prefix + "add")) {ytSeach(msg, args);}
        else if (msg.content.startsWith(CONFIG.prefix + "skip")) {PlayNextStreamInQueue(msg, ytSongQueue, "skip")}
        function checkQueue(msg, song) {
            if (!voiceChannel) {
                return msg.channel.send(":x: You must be in a voice channel first!");
            }

            else {
                if (!ytSongQueue.length) {
                    ytSongQueue.push(song);
                    console.log(song);
                    voiceChannel.join();
                    play(msg, song)
                }
                else {
                    QueueNewAudio(msg, song)
                }
            }
        }
        function QueueNewAudio(msg, song) {
            if (ytSongQueue.length == 0) {
                ytSongQueue.push(song);
                //console.log(song)
                //console.log("new audio " + song);
                play(msg, song);
            }
            else {
                ytSongQueue.push(song);
                console.log(ytSongQueue)
                msg.reply("Added to Queue: " + song);
            }

        }
        function resumeSong(msg, song) {
            voiceChannel.join();
            const stream = ytdl(song, {filter: 'audioonly'});
            dispatcher = client.voiceConnections.first().playStream(stream, streamOptions);
            msg.reply("Now Playing " + ytSongQueue[0]);
            dispatcher.on('end', () => {
                PlayNextStreamInQueue(msg, ytSongQueue, "play", userRole);
            });
            dispatcher.on('error', (err) => {
                console.log(err);
            });
        }
        function play(msg, song) {
            const stream = ytdl(song, {filter: 'audioonly'});
            if (song) {
                if (song.startsWith("https")) {
                    if (dispatcher == null) {
                        console.log("Dispatcher is NULL");
                        let voiceConnection = client.voiceConnections.first();
                        //console.log(voiceConnection);

                        if (voiceConnection) {

                            let dispatcher = client.voiceConnections.first().playStream(stream, streamOptions);
                            dispatcher.on('end', () => {
                                PlayNextStreamInQueue(msg, ytSongQueue, "play");
                            });
                            dispatcher.on('error', (err) => {
                                console.log(err);
                            });
                        }
                    }
                    else if (dispatcher != null) {
                        let dispatcher = client.voiceConnections.first().playStream(stream, streamOptions);
                    }
                }
                else {
                    ytSeach(msg, args);
                }
            }
        }
        function ytSeach(msg, song){
            let opts = {
                key: "AIzaSyBBQDdns6QfMC4whiey8JRnAE9odkfNP1U",
            }
            let name = song;
            console.log(name);
            search(name, opts, (err, results) => {
                if(err) return console.log(err);
                console.log(results[0].link);
                checkQueue(msg, results[0].link);
            })
        };
        function playNext(msg, song) {
            let dispatcher = client.voiceConnections.first().playStream(song, streamOptions);
        }
        function PlayNextStreamInQueue(msg, ytSongQueue, opt) {
            // if there are streams remaining in the queue then try to play
            if (ytSongQueue.length != 0 && opt == "play") {
                playNext(msg, ytSongQueue[0]);
            }
            else if(opt == "skip") {
                ytSongQueue.shift();
                console.log(ytSongQueue[0]);
                play(msg, ytSongQueue[0]);
            }
            else {
                voiceChannel.leave();
                //playSong.play(CONFIG.prefix + "play", CONFIG, ytdl, ytSongQueue, client, dispatcher, userRole)
            }
        }
    }
}
