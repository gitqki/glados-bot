export class HimeBot{
    constructor() {

    }
    public delete(msg, CONFIG, helper){
        if (msg.content.startsWith(CONFIG.hime)){
            const con = msg.content;
            const comment = con.substr(con.indexOf(".") + 1);

            if (comment.startsWith('play') ||
                comment.startsWith('stop') ||
                comment.startsWith('resume') ||
                comment.startsWith('pause') ||
                comment.startsWith('current') ||
                comment.startsWith('queue') ||
                comment.startsWith('skip') ||
                comment.startsWith('forceskip')
            ) {
                // Delete message
                msg.delete()
                    .then(msg => console.log(helper.gct() + ' - Autodelete'))
                    .catch(console.error);

            }

            /** Still in development **/
            //TODO complete copy songname, we still need a filter for existing songnames
            /*  if (comment.startsWith('play')) {
                var splitMsg = msg.content.split(' ', 2);
                var songName = splitMsg[1];
                msg.guild.channels.find("name", "test").send(songName);
            }*/
        }
    }
}