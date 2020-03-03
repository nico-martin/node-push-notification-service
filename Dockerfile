FROM node:10
RUN mkdir -p /usr/src/push-notification-service/node_modules && chown -R node:node /usr/src/push-notification-service
WORKDIR /usr/src/push-notification-service
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 8080
CMD [ "node", "yarn prod" ]
