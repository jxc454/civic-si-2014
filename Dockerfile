FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm install -g typescript
RUN npm install
RUN tsc
COPY . /app
VOLUME /tmp
CMD node dist/server.js
EXPOSE 4000