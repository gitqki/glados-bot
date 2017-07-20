/**
@Author: Stefan Behnert, Thien-An Nguyen
@Version: 0.4
@date: 19.07.2017
@email:
@run: node gladosBot.js
**/

import * as fs from "fs";
import * as CONFIG from './config/config.json';
import * as Discord from "discord.js";
import {Sentences} from "./classes/commands/fun/sentences.class";
import {Commands} from "./classes/commands/util/prefixCommands.class";
import {HimeBot} from "./classes/commands/delete/himeBot.class";
import {GladosBot} from "./classes/commands/delete/gladosBot.class";
import {Soundboard} from "./classes/commands/music/soundboard.class";
import {Play} from "./classes/commands/music/play.class";
import {Stop} from "./classes/commands/music/stop.class";
import {Pause} from "./classes/commands/music/pause.class";
import {Resume} from "./classes/commands/music/resume.class";
import {YoutubeSearch} from "./classes/commands/music/search.class";
import {Doing} from "./classes/commands/info/doing.class";
import {Helper} from "./classes/helper/helper.class";
import {UserRoles} from "./classes/helper/roles.class";
import {} from "./classes/handler/bootstrap.class";
import ytdl = require('ytdl-core');
import search = require('youtube-search');

const wPrefix = new Commands();
const helper = new Helper();
const roles = new UserRoles();
const infoDoStuff = new Doing();
const sentences = new Sentences();
const himeBot = new HimeBot();
const gladowBot = new GladosBot();
const play = new Play();
const stop = new Stop();
const pause = new Pause();
const resume = new Resume();
const newSoundboard = new Soundboard();
const yt_search = new YoutubeSearch();
const client = new Discord.Client();

const ytAudioQueue = [];
const ytSongQueue = [];
const dispatcher = null;


// Create ready event listener
client.on('ready', () => {
    console.log('Logged in as: ' + client.user.tag + '!');
    console.log('Logged in at: ' + helper.gct());
});

// Create message listener
client.on('message', msg => {
    // declare vars using msg
    let userRole: any = roles.getRoles(msg);

    // Prevents bot is calling own commands. Could end in infinite loop.
    if (msg.author.bot && msg.content.startsWith(CONFIG.prefix)) return;

    // Call classes here
    sentences.getCommands(msg, helper, client, ytdl, CONFIG);
    wPrefix.getCommands(msg, CONFIG, helper, fs);
    himeBot.delete(msg, CONFIG, helper);
    gladowBot.delete(msg, CONFIG, helper);
    infoDoStuff.getCommands(msg, CONFIG, helper);
    play.play(msg, CONFIG, ytdl, ytSongQueue, client, dispatcher, userRole);
    stop.stop(msg, CONFIG, ytSongQueue, ytAudioQueue);
    newSoundboard.getCommands(msg, CONFIG, ytdl, ytAudioQueue, client, dispatcher, userRole, ytSongQueue);

});

// insert or remove bot token
client.login("MzM2NTk2MDUxMDgxNTYwMDY1.DE6nAw.ilzu0C9jb1I9CbcMTKNNUIJezx4");
