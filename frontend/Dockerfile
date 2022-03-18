# base image
FROM node:12.9.1

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/backend/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache backend dependencies
COPY package.json /usr/src/app/package.json
RUN npm install --silent
#RUN npm install react-scripts@1.1.1 -g --silent

# start backend
CMD ["npm", "start"]
