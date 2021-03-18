# FROM node:current-alpine AS base
# WORKDIR /base
# COPY package*.json ./
# RUN npm install
# COPY . .

# FROM base AS build
# ENV NODE_ENV=production
# WORKDIR /build
# COPY --from=base /base ./
# RUN npm run build

# FROM node:current-alpine AS production
# ENV NODE_ENV=production
# WORKDIR /app
# COPY --from=build /build/package*.json ./
# COPY --from=build /build/.next ./.next
# COPY --from=build /build/public ./public
# RUN npm install next

# EXPOSE 3001
# CMD npm run start

# Dockerfile

# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

# install dependencies
RUN npm install

# start app
RUN npm run build
EXPOSE 3000
CMD npm run start