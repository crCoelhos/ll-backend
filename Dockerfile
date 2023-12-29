FROM node:20-alpine

WORKDIR /ll-back
COPY package.json .
RUN npm install
COPY . .
CMD npm run start
