/**
@Author: Stefan Behnert, Thien-An Nguyen
@Version: 0.2
@date: 15.07.2017
@email:
@run: node super-clean-bot.js
**/

import * as fs from "fs";
import * as CONFIG from './config/config.json';
import * as Discord from "discord.js";
import {noPrefixCommands} from "./classes/noPrefixCommands.class";
import {prefixCommands} from "./classes/prefixCommands.class";
import {HimeBot} from "./classes/deleteHimeBotCommands.class";
import {Helper} from "./classes/helper.class";
import {} from "./classes/bootstrap.class";

const wPrefix = new prefixCommands();
const helper = new Helper();
const noPrefix = new noPrefixCommands();
const himeBot = new HimeBot();
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
    noPrefix.getCommands(msg, helper);
    wPrefix.getCommands(msg, CONFIG, helper, fs);
    himeBot.deleteHime(msg, CONFIG, helper);

});

// insert or remove bot token
client.login("MzM1MTU3MjA2MTEyNzk2Njc0.DEmYQA.utUcnIwkk7a2qiaSPbekO02aqc8");
