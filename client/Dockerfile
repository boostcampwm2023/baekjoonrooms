
# Use an official Node.js runtime as a parent image
FROM node:18.14

LABEL title="docker-test-client"

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 4173

# Command to run the application
RUN npm run build
CMD npm run preview
