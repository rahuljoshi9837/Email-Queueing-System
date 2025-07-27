# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy files
COPY ./package*.json ./
COPY ./producer ./producer
COPY ./shared ./shared

# Install dependencies
RUN npm install

# Set default command
CMD ["node", "producer/index.js"]

