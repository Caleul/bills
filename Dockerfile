FROM node:20.11-alpine3.18

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./prisma ./prisma
COPY ./build ./src

EXPOSE 3000

CMD ["npm", "start"]