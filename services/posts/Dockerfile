FROM node:alpine

WORKDIR /usr/app
COPY types.js .
COPY config.js .
WORKDIR /usr/app/posts
COPY posts/package.json .
RUN npm install
COPY posts/ .

CMD ["npm", "start"]
