FROM node:boron

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Download app from github
RUN git clone https://github.com/laurinium/glados-bot .
RUN npm install
ENV BOT_TOKEN="test"
CMD [ "npm", "start" ]
