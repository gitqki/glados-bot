/*@prefix: no prefix here
 *@function: Conversation Statements
 */

export class Sentences {
    constructor(){

    }
    public getCommands(msg, helper, client, ytdl, CONFIG) {
        if (msg.content.startsWith("deleted messages")) {
            setTimeout(() => {
                msg.delete()
                    .then(msg => console.log(helper.gct() + ' - Autodelete'))
                    .catch(console.error);
            }, 5000);
        }
        if (msg.content === 'Was geht?') {
            msg.reply('Alles, was Beine hat! :Kappa:');
        }
        if (msg.content === "How are you?") {
            msg.channel.send('Fine and you?');
        }

        function play(connection, msg){
            const msg2 = msg.content.split(" ",2);
            ytdl(msg2[1], { filter : 'audioonly' });
        }
    }
}
