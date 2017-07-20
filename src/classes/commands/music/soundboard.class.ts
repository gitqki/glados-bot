import {Play} from "./play.class";
const playSong = new Play();
export class Soundboard {
    constructor() {

    }
    getCommands(msg, CONFIG, ytdl, ytAudioQueue, client, dispatcher, userRole, ytSongQueue) {
        const voiceChannel = msg.member.voiceChannel;
        let userInput = Array(
            "The cake is a lie",
            "You need more companion cubes",
            "Bot no good",
            "Nay",
            "Yay",
            "Stop it",
            "Do it!",
            "Do it",
            "gg ez",
            "are you gay?",
            "Was ist euer Handwerk?"
        );
        let response = Array(
            "https://www.youtube.com/watch?v=Y6ljFaKRTrI",
            "https://www.youtube.com/watch?v=3fVUU7Drv2I",
            "https://www.youtube.com/watch?v=Di2wDDwxqHg",
            "https://www.youtube.com/watch?v=pd53lRZfnV0",
            "https://www.youtube.com/watch?v=0lYpD9rfPmc",
            "https://www.youtube.com/watch?v=reop2bXiNgk",
            "https://www.youtube.com/watch?v=ZXsQAXx_ao0",
            "http://voice.share.laur.me:8888/tts.php?lng=en-US&msg=fucking%20cunt%20g%20g%20e%20z%20go%20kill%20yourself",
            "http://voice.share.laur.me:8888/tts.php?lng=en-US&msg=i%20think%20you%20like%20to%20suck%20cocks%20kappa%20pride",
            "https://www.youtube.com/watch?v=rym5hSkZks8"
        );

        for (let a = 0; userInput.length > a;) {
            userInput[a].toLowerCase();
            if (msg.content.startsWith(msg.mentions.members.first()) || msg.content.startsWith("")) {
                if (msg.content === userInput[a].toLowerCase() || msg.content === userInput[a].toUpperCase() || msg.content === userInput[a] ||
                    msg.content === msg.mentions.members.first() + " " + userInput[a].toLowerCase() || msg.content === msg.mentions.members.first() + " " + userInput[a].toUpperCase() ||
                    msg.content === msg.mentions.members.first() + " " + userInput[a]) {
                    switch (userInput[a]) {
                        case userInput[0]:
                        {
                            checkQueue(msg, response[0]);
                            break;
                        }
                        case userInput[1]:
                        {
                            checkQueue(msg, response[1]);
                            break;
                        }
                        case userInput[2]:
                        {
                            checkQueue(msg, response[2]);
                            break;
                        }
                        case userInput[3]:
                        {
                            checkQueue(msg, response[3]);
                            break;
                        }
                        case userInput[4]:
                        {
                            checkQueue(msg, response[4]);
                            break;
                        }
                        case userInput[5]:
                        {
                            checkQueue(msg, response[5]);
                            break;
                        }
                        case userInput[6] || userInput[7]:
                        {
                            checkQueue(msg, response[6]);
                            break;
                        }
                        case userInput[8]:
                        {
                            checkQueue(msg, response[7]);
                            break;
                        }
                        case userInput[9]:
                        {
                            checkQueue(msg, response[8]);
                            break;
                        }
                        case userInput[10]:
                        {
                            msg.reply("AHU AHU AHUUUUU!");
                            checkQueue(msg, response[9]);
                            break;
                        }
                        default:
                            break;
                    }
                } else {
                    //console.log("No command found");
                }
            }
            a++;
        };

        function checkQueue(msg, song) {
            if (!voiceChannel) {
                return msg.channel.send(":x: You must be in a voice channel first!");
            }

            else {
                if (!ytAudioQueue.length) {
                    ytAudioQueue.push(song);
                    voiceChannel.join();
                    play(msg, song)
                }
                else {
                    QueueNewAudio(msg, song)
                }
            }
        }
        function QueueNewAudio(msg, song) {
            if (ytAudioQueue.length == 0) {
                ytAudioQueue.push(song);
                console.log("new audio " + song);
                play(msg, song);
            }
            else {
                ytAudioQueue.push(song);
                console.log("Queued audio " + song);
            }

        }
        function play(msg, song) {

            const streamOptions = {seek: 0, volume: 1};
            if (song.startsWith("http://voice.share.laur.me:8888/")){
                console.log(song);
                let dispatcher = client.voiceConnections.first().playStream(song);
                dispatcher.on('end', () => {
                    PlayNextStreamInQueue(msg, ytAudioQueue);
                });
                dispatcher.on('error', (err) => {
                    console.log(err);
                });

            }
            else {
                if (song) {
                    const stream = ytdl(song, {filter: 'audioonly'});
                    if (dispatcher == null) {
                        console.log("Dispatcher is NULL");
                        let voiceConnection = client.voiceConnections.first();
                        //console.log(voiceConnection);

                        if (voiceConnection) {
                                let dispatcher = client.voiceConnections.first().playStream(stream, streamOptions);
                                dispatcher.on('end', () => {
                                    PlayNextStreamInQueue(msg, ytAudioQueue);
                                });
                                dispatcher.on('error', (err) => {
                                    console.log(err);
                                });
                        }
                    }
                    else {
                        let dispatcher = client.voiceConnections.first().playStream(stream, streamOptions);
                    }
                }
            }
        }
        function PlayNextStreamInQueue(msg, ytAudioQueue) {
            ytAudioQueue.shift();
            // if there are streams remaining in the queue then try to play
            if (ytAudioQueue.length != 0) {
                play(msg, ytAudioQueue[0]);
            }
            else {
                voiceChannel.leave();
                //playSong.play(CONFIG.prefix + "play", CONFIG, ytdl, ytSongQueue, client, dispatcher, userRole)
            }
        }

    }
}