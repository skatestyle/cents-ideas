FROM node:lts-alpine

WORKDIR /usr/app/src

COPY ./packages/common ./packages/common
COPY ./services/gateway ./services/gateway

COPY package.json .
COPY ./docker-images/gateway/tsconfig.json ./
COPY ./tsconfig.settings.json ./

RUN yarn bootstrap

WORKDIR /usr/app/src/services/gateway
CMD yarn start