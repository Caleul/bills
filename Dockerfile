FROM node:20.11.1

ENV DATABASE_URL="postgresql://docker:docker@postgres:5432/bills?schema=public"

ENV REDIS_PORT="redis"

WORKDIR /app

COPY package.json ./

RUN npm install

COPY ./prisma ./prisma

COPY ./build ./src

EXPOSE 3000

CMD ["npm", "start"]