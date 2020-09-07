FROM node AS builder
WORKDIR /appdata
COPY package.json package.json
RUN npm install
FROM node:slim
RUN apt update && apt upgrade -y && apt install ca-certificates -y
WORKDIR /appdata
COPY --from=builder /appdata /appdata
COPY db_helper.js db_helper.js
COPY database.json database.json
COPY entrypoint.sh entrypoint.sh
COPY public public
COPY routes routes
COPY views views
COPY controllers controllers
COPY migrations migrations
COPY bin bin
COPY app.js app.js


ENTRYPOINT /appdata/entrypoint.sh