FROM node:alpine

WORKDIR /usr/app
COPY types.js .
COPY config.js .
WORKDIR /usr/app/query
COPY query/package.json .
RUN npm install
COPY query/ .

CMD ["npm", "start"]
