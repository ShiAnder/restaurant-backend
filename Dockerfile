# Dockerfile
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port
EXPOSE 3000

# Run the application
CMD ["node", "app.js"]
