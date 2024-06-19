FROM node:14-slim

# Install necessary dependencies
RUN apt-get update && \
    apt-get install -y libnss3 libnspr4 libgbm1 && \
    rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN bun install

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "bun", "start" ]
