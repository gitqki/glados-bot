# Token in envvar schmeißen (ich les den hier aus ner datei)
export BOT_TOKEN=$(cat ~/bottoken)
# Dockerfile aus dem master holen
wget https://github.com/gitqki/glados-bot/master/Dockerfile
# Image bauen
docker build --no-cache -t glados-bot:latest .
# Run teh shit
docker run -e BOT_TOKEN --name "discord_bot" -d glados-bot
