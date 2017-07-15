# glados-bot
It's just a bot.  The only bot you will ever need.

# Framework Documentation
https://discord.js.org/#/

# How to start
1. First of all go here: https://discordapp.com/developers/applications/me/
2. Click "new App"
3. Configure it (name, description...)
4. Now you have the overview. Click "create a Bot User".
* This grants you an unique token, which you have to expose as an Environment Variable called BOT_TOKEN 
5. Now, to invite the Bot to you channel, and test it, go here: 
https://discordapp.com/oauth2/authorize?client_id=[YourClientID]&scope=bot&permissions=536063039
Replace the [YourClientID] with your client ID. You can find it under your app-details page.
6. Now you have invited the bot to your channel, you can play with it. Use prefix + commands to see all commands.
7. How can you edit the bot now?
8. Clone this git. You will need:
* Python 2.X
* node.js

# run with Docker
9. First download Docker Toolbox and install
10. Open the Docker Quickstart Terminal
11. Wait until it finish initializing
12. In the Docker Terminal move to the Project root path
13. Build the Docker Container with "docker build ."
14. Now run the Deploy Script with "./deploy.sh"

# run without Docker 
9. To run it, open windows or linux console in glados-bot folder
10. npm install typescript --save discord.js (This will create a node_folder in your libary)
11. Type: npm run start

Now you have started the bot. Changes can be made in the glados-bot/src/ folder.
Just redeploy the bot if changes are made. To redeploy just run the deploy.sh script 
or type npm run with the terminal in the root path of the project.