# pull official base image
FROM node:16-alpine as build

# set working directory
RUN mkdir -p /frontend
WORKDIR /frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /frontend/
COPY yarn.lock /frontend/

COPY . /frontend/
RUN cd /frontend/

RUN apk add bash
RUN yarn install

#EXPOSE 3000

# build app
RUN yarn build

FROM nginx

COPY --from=build /frontend/build /usr/share/nginx/html

COPY ./sites-enabled/default.conf  /etc/nginx/conf.d/default.conf