/**
@Author: Stefan Behnert, Thien-An Nguyen
@Version: 0.3
@date: 17.07.2017
@email:
@run: node gladosBot.js
**/

import * as fs from "fs";
import * as CONFIG from './config/config.json';
import * as Discord from "discord.js";
import {Sentences} from "./classes/commands/fun/sentences.class";
import {Commands} from "./classes/commands/util/prefixCommands.class";
import {HimeBot} from "./classes/commands/delete/himeBot.class";
import {Soundboard} from "./classes/commands/music/soundboard.class";
import {Play} from "./classes/commands/music/play.class";
import {Stop} from "./classes/commands/music/stop.class";
import {YoutubeSearch} from "./classes/commands/music/search.class";
import {Doing} from "./classes/commands/info/doing.class";
import {Helper} from "./classes/helper/helper.class";
import {} from "./classes/handler/bootstrap.class";
import ytdl = require('ytdl-core');
import search = require('youtube-search');

const wPrefix = new Commands();
const helper = new Helper();
const infoDoStuff = new Doing();
const sentences = new Sentences();
const himeBot = new HimeBot();
const play = new Play();
const stop = new Stop();
const newSoundboard = new Soundboard();
const yt_search = new YoutubeSearch();
const client = new Discord.Client();

// Create ready event listener
client.on('ready', () => {
    console.log('Logged in as: ' + client.user.tag + '!');
    console.log('Logged in at: ' + helper.gct());
});

// Create message listener
client.on('message', msg => {

    // Prevents bot is calling own commands. Could end in infinite loop.
    if (msg.author.bot && msg.content.startsWith(CONFIG.prefix)) return;

    // Call classes here
    sentences.getCommands(msg, helper, client, ytdl, CONFIG);
    wPrefix.getCommands(msg, CONFIG, helper, fs);
    himeBot.delete(msg, CONFIG, helper);
    infoDoStuff.getCommands(msg, CONFIG, helper);
    play.play(msg, client, ytdl, CONFIG);
    stop.stop(msg, CONFIG);
    newSoundboard.getCommands(msg, CONFIG, ytdl);

});

// insert or remove bot token
client.login(process.env.BOT_TOKEN);
