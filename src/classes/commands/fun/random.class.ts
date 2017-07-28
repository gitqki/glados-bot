/*@prefix: no prefix here
 *@function: Conversation Statements
 */

export class Random {
    constructor(){

    }
    public getCommands(msg, helper, client, ytdl, CONFIG) {
        let cases = [
            "waifu?",
            "gay?",
            "skill?"
        ];
        let response = {
            waifu : Math.floor((Math.random() * 10) + 1),
            gay : Math.floor((Math.random() * 3) + 1)
        };
        let gay = {
            1: " is gay",
            2: " cologne level.",
            3: " is not gay"
        };
        if (msg.content === msg.mentions.members.first() + ' ' + cases[0]) {
            msg.channel.send(msg.mentions.members.first() + " is " + response.waifu + "/10 waifu!");
        }
        if (msg.content === msg.mentions.members.first() + ' ' + cases[1]) {
            msg.channel.send(msg.mentions.members.first() +  gay[response.gay]);
        }
    }
}
