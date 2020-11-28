FROM node:alpine

WORKDIR /usr/app
COPY types.js .
COPY config.js .
WORKDIR /usr/app/comments
COPY comments/package.json .
RUN npm install
COPY comments/ .

CMD ["npm", "start"]
