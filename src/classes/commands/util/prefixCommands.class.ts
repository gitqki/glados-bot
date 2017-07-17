/*@prefix: ../config/config.json CONFIG.prefix
 *@function: Commands here
 */
export class Commands {
    constructor(){
    }
    public getCommands(msg, CONFIG, helper, fs) {

        if (msg.content.startsWith(CONFIG.prefix + "copy")) {
            var splitMsg = msg.content.split(' ', 2);
            var songName = splitMsg[1];
            msg.guild.channels.find("name", "test").send(songName);
        }

        if (msg.content.startsWith(CONFIG.prefix + "clr")) {
            // Split spaces
            var astr = msg.content.split(' ').pop();
            // Get messages
            if (astr === '1') {
                msg.channel.fetchMessages({
                    limit: 2
                })
                    .then(messages => msg.channel.bulkDelete(2)).then(console.log(helper.gct() + ' - Deleted message from: ' + msg.author.tag + '!'))
                    .catch(console.error);
                setTimeout(() => {
                    msg.channel.send("deleted messages: " + (astr)).then(console.log(helper.gct() + ' - ' + astr + ' deleted message/s from: ' + msg.author.tag + '!'))
                }, 500);
            } else {
                astr = astr++ + 1;
                msg.channel.fetchMessages({
                    limit: astr
                })
                    .then(messages => msg.channel.bulkDelete(astr)).then(console.log(helper.gct() + ' - Deleted message from: ' + msg.author.tag + '!'))
                    .catch(console.error);
                setTimeout(() => {
                    msg.channel.send("deleted messages: " + (astr-- - 1)).then(console.log(helper.gct() + ' - ' + astr + ' deleted message/s from: ' + msg.author.tag + '!'))
                }, 500);
            }
        }

        // Let user change the Prefix and write it into json
        if (msg.content.startsWith(CONFIG.prefix + "prefix")) {
            let newPrefix = msg.content.split(" ").slice(1, 2)[0];
            CONFIG.prefix = newPrefix;
            msg.delete().then(msg => console.log(helper.gct() + ' - ' + msg.author.tag + ' changed Prefix to "' + newPrefix + '"'));
            msg.reply('Prefix is now "' + newPrefix + '"');
            fs.writeFile("../config/config.json", JSON.stringify(CONFIG), (err) => console.error);
        }
    }
}