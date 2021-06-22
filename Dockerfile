FROM node:12.21.0

# set working directory
WORKDIR /code

# add `/code/node_modules/.bin` to $PATH
ENV PATH /code/node_modules/.bin:$PATH

# install and cache app dependencies
COPY . /code/
RUN npm install
RUN npm install @vue/cli@3.7.0 -g

RUN npm run test
