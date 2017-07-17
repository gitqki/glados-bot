export class Soundboard {
    constructor() {

    }
    getCommands(msg, CONFIG, ytdl) {
        const voiceChannel = msg.member.voiceChannel;
        let userInput = Array(
            "The cake is a lie",
            "You need more companion cubes",
            "Bot no good",
            "Nay",
            "Yay",
            "Stop it",
            "Do it!",
            "Do it"
        );
        let response = Array(
            "https://www.youtube.com/watch?v=Y6ljFaKRTrI",
            "https://www.youtube.com/watch?v=3fVUU7Drv2I",
            "https://www.youtube.com/watch?v=Di2wDDwxqHg",
            "https://www.youtube.com/watch?v=pd53lRZfnV0",
            "https://www.youtube.com/watch?v=eZeYVIWz99I",
            "https://www.youtube.com/watch?v=reop2bXiNgk",
            "https://www.youtube.com/watch?v=ZXsQAXx_ao0"
        );

        for (let a = 0; userInput.length > a;) {
            userInput[a].toLowerCase();
            if (msg.content.startsWith(msg.mentions.members.first())) {
                if (msg.content === userInput[a].toLowerCase() || msg.content === userInput[a].toUpperCase() || msg.content === userInput[a] ||
                    msg.content === msg.mentions.members.first() + " " + userInput[a].toLowerCase() || msg.content === msg.mentions.members.first() + " " + userInput[a].toUpperCase() ||
                    msg.content === msg.mentions.members.first() + " " + userInput[a]) {
                    switch (userInput[a]) {
                        case userInput[0]:
                        {
                            console.log("Playing command song: The cake is a lie");
                            play(msg, response[0]);
                            break;
                        }
                        case userInput[1]:
                        {
                            console.log("You need more companion cubes");
                            play(msg, response[1]);
                            break;
                        }
                        case userInput[2]:
                        {
                            console.log("Bot no good");
                            play(msg, response[2]);
                            break;
                        }
                        case userInput[3]:
                        {
                            console.log("Nay");
                            play(msg, response[3]);
                            break;
                        }
                        case userInput[4]:
                        {
                            console.log("Yay");
                            play(msg, response[4]);
                            break;
                        }
                        case userInput[5]:
                        {
                            console.log("Stop it");
                            play(msg, response[5]);
                            break;
                        }
                        case userInput[6] || userInput[7]:
                        {
                            console.log("Do it");
                            play(msg, response[6]);
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

        function play(msg, song) {
            let isInQueue;
            ytdl.getInfo(song, function(err, info) {
                isInQueue = info.title
                return isInQueue;
            });
            if (!voiceChannel) {
                return msg.channel.send(":x: You must be in a voice channel first!");
            }

            else {
                voiceChannel.join()
                    .then(connection => {
                        let stream = ytdl(song, {
                            audioonly: true
                        });
                            let dispatcher = "";
                            if(!connection.dispatcher){// Check if its already playing in voicechannel, if not, play the clip
                                let dispatcher = connection.playStream(stream);
                                ytdl.getInfo(song, function (err, info) {
                                    const title = info.title
                                    console.log(`${msg.author.username}, Queued the song '${title}.'`)
                                    msg.channel.send(`Now playing \`${title}\``)
                                });
                                dispatcher.on('end', () => {
                                    voiceChannel.leave();
                                });
                            }
                            else {voiceChannel.leave();} // If song is already return queue
                    });
            }
        }
    }