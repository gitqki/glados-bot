export class YoutubeSearch {
    constructor(){

    }
    search(searchKeywords, ytdl) {
        // TODO write search function for youtube api
        var requestUrl = 'https://www.googleapis.com/youtube/v3/search' + `?part=snippet&q=${escape(searchKeywords)}&key=${API_KEY}`;
    }
}