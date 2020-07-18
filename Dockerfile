FROM node AS builder
WORKDIR /appdata
COPY package.json package.json
RUN npm install
FROM node:slim
RUN apt update && apt upgrade -y && apt install ca-certificates -y
WORKDIR /appdata
COPY --from=builder /appdata /appdata
COPY util.js util.js
COPY db_helper.js db_helper.js
COPY mailgun_helper.js mailgun_helper.js
COPY database.json database.json
COPY entrypoint.sh entrypoint.sh
COPY static static
COPY views views
COPY controllers controllers
COPY deploy deploy
COPY migrations migrations
COPY app.js app.js


ENTRYPOINT /appdata/entrypoint.sh