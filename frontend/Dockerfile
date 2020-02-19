FROM node:alpine

WORKDIR /code

COPY package.json package.json
RUN npm i
COPY . .
CMD ["npm", "run", "start"]