# glados-bot
It's just a bot.  The only bot you will ever need.

# Documentation of the Framework
https://discord.js.org/#/

# How to start
1. First of all go here: https://discordapp.com/developers/applications/me/
2. Click "new App"
3. Configure it (name, description...)
4. Now you have the overview. Click "create a Bot User".
* This grants you an unique token, which you have to insert into config.json (otherwise, the bot wont run)
5. Now, to invite the Bot to you channel, and test it, go here: 
https://discordapp.com/oauth2/authorize?client_id=[YourClientID]&scope=bot&permissions=536063039
Replace the [YourClientID] with your client ID. You can find it under your app-details page.
6. Now you have invited the bot to your channel, you can play with it. Use prefix + commands to see all commands.
7. How can you edit the bot now?
8. Clone this git. You will need:
* Python 2.X
* node.js
9. You see: 
* directory: classes
* files: config.json, error-log.txt, log-file.txt, qkicream-bot.js
10. To edit just open qkicream-bot.js and/or classes, like helper.class.js or bootstrap.class.js
11. To run it, open windows or linux console in qkicream-bot folder
12. npm install --save discord.js (This will create a node_folder in your libary)
13. Type: node qkicream-bot.js >log-file.txt 2>error-log.txt

That's it. You are done.

