FROM node:18

WORKDIR /app

COPY ./package*.json ./
COPY ./consumer ./consumer
COPY ./shared ./shared

RUN npm install

CMD ["node", "consumer/worker.js"]
