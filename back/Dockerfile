FROM node:lts-alpine
WORKDIR /usr/src/app

COPY ./package.json .
RUN yarn install

EXPOSE 8000
CMD [ "yarn", "start:dev" ]