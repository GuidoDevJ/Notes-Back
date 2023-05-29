FROM node:18-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install -g nodemon && npm install ts-node && npm install


COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm","run","start"]