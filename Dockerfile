FROM node:12
WORKDIR /app
COPY package.json Makefile /app/
RUN npm prune --production
RUN npm install -g typescript db-migrate
RUN npm install
COPY . /app
VOLUME /tmp
EXPOSE 4000
# TODO use something other than ./server.js in the npm script (pm2?)
ENTRYPOINT npm run start-api