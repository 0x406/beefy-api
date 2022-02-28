FROM node:16-alpine

WORKDIR /app
ADD . /app

RUN yarn run install-all
CMD [ "yarn", "start" ]
EXPOSE 3000