FROM node:18-alpine As base
EXPOSE 3000

FROM node:18-alpine As pruned

ARG API_GATEWAY_PORT
ENV API_GATEWAY_PORT=${API_GATEWAY_PORT}

ARG KAFKA_HOST
ENV KAFKA_HOST=${KAFKA_HOST}

ENV KAFKAJS_NO_PARTITIONER_WARNING=1

RUN npm i -g pnpm@8.15.4

WORKDIR /usr/src/app

COPY package.json pnpm-lock.yaml ./

RUN apk update && apk add curl
RUN pnpm i --production
RUN curl -sf https://gobinaries.com/tj/node-prune | sh
RUN node-prune

WORKDIR /usr/src/app
# A wildcard is used to ensure both package.json are copied
COPY package.json  pnpm-lock.yaml ./
# Install app dependencies
RUN pnpm install --prod
EXPOSE ${API_GATEWAY_PORT}

FROM node:18-alpine As development

ARG API_GATEWAY_PORT
ENV API_GATEWAY_PORT=${API_GATEWAY_PORT}

ARG KAFKA_HOST
ENV KAFKA_HOST=${KAFKA_HOST}

ENV KAFKAJS_NO_PARTITIONER_WARNING=1

RUN npm i -g pnpm@8.15.4

WORKDIR /usr/src/app
COPY ./src ./src
COPY package.json pnpm-lock.yaml ./ 
COPY tsconfig.build.json tsconfig.json ./
COPY .eslintrc.js .prettierrc ./
COPY nest-cli.json nest-cli.json ./
RUN pnpm i 
RUN npm run build
EXPOSE ${API_GATEWAY_PORT}
CMD ["sh", "-c", "npm run start:dev"]

###################
# BUILD FOR PRODUCTION
###################

FROM node:18-alpine As production

ARG API_GATEWAY_PORT
ENV API_GATEWAY_PORT=${API_GATEWAY_PORT}

ARG KAFKA_HOST
ENV KAFKA_HOST=${KAFKA_HOST}

ENV KAFKAJS_NO_PARTITIONER_WARNING=1

RUN npm i -g pnpm@8.15.4

WORKDIR /usr/src/app

COPY --from=development /usr/src/app/dist ./dist
COPY --from=pruned /usr/src/app/package.json /usr/src/app/pnpm-lock.yaml ./
COPY --from=pruned /usr/src/app/node_modules ./node_modules
EXPOSE ${API_GATEWAY_LEARNING_PORT}
CMD ["sh", "-c", "npm run start:prod"]