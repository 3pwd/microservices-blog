FROM node:alpine

WORKDIR /usr/app
COPY types.js .
COPY config.js .
WORKDIR /usr/app/event-bus
COPY event-bus/package.json .
RUN npm install
COPY event-bus/ .

CMD ["npm", "start"]
