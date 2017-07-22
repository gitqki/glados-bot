import {getInfo} from "ytdl-core";

export class Helper {
	constructor(){
	}

	public gct() {
		const DATE = new Date().toString();
		return DATE;
	}
	songInfo(song, msg, opt) {
		let infoParams:any;
		return getInfo(song,
			function (err, info) {
				infoParams = {
					'songtitle': info.title,
					'songlength': Math.floor(info.length_seconds/60) + ":" + info.length_seconds%60,
				};
				if (opt == "queue"){ msg.channel.send(":white_check_mark: `" + infoParams.songtitle + "` added to queue.") }
				else if (opt == "now_playing"){msg.channel.send(":arrow_forward: `" + infoParams.songtitle + "` :clock1: `" + infoParams.songlength + " min.`" + " :earth_asia: `" + song + "`")}
			});
	}


}

