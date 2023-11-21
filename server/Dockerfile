# Use an official Node.js runtime as a parent image
FROM node:18.14

LABEL title="server"

# Install netcat
RUN apt-get update && apt-get install -y netcat

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose the port the app runs on
EXPOSE 4000

ARG DB_HOSTNAME
ARG DB_PORT

# Command to run the application
RUN npm run build
RUN chmod +x wait-for-mysql.sh
CMD ./wait-for-mysql.sh $DB_HOSTNAME $DB_PORT npm run start:prod