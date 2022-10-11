# pull official base image
FROM node:16-alpine as build

# set working directory
RUN mkdir -p /admin
WORKDIR /admin

# add `/app/node_modules/.bin` to $PATH
ENV PATH /admin/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json /admin/
COPY yarn.lock /admin/

COPY . /admin/
RUN cd /admin/

RUN apk add bash
RUN yarn install

# EXPOSE 5000

# build app
RUN yarn build

FROM nginx

COPY --from=build /admin/build /usr/share/nginx/html

COPY ./sites-enabled/default.conf  /etc/nginx/conf.d/default.conf