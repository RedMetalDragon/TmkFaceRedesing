# Use an official Node runtime as the base image
FROM node:lts-alpine

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy package.json and yarn.lock to the Docker image
COPY package.json yarn.lock ./

# Install the application dependencies inside the Docker image
RUN yarn install

# Copy the rest of your application's source code to the Docker image
COPY . .

# Expose port 3000 for the application
EXPOSE 3000

# Set an environment variable for the endpoint URL
ENV TMK_BACKEND_API_URL="http://localhost:3001/api/v1"

# Define the command to run your application
CMD ["yarn", "start"]
