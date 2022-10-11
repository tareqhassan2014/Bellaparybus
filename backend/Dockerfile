# base image
FROM node:16-alpine

RUN mkdir -p /backend
WORKDIR /backend

ENV PATH /backend/node_modules/.bin:$PATH

COPY package*.json /backend/

COPY . /backend/
RUN cd /backend/

RUN apk add bash
RUN npm install --silent

# EXPOSE 8080

# start app
CMD ["npm", "start"]
