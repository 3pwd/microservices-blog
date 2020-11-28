FROM node:alpine

WORKDIR /usr/app
COPY types.js .
COPY config.js .
WORKDIR /usr/app/moderation
COPY moderation/package.json .
RUN npm install
COPY moderation/ .

CMD ["npm", "start"]
