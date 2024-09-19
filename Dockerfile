# Use an official Node.js LTS version as the base image
FROM node:18.19.0-alpine3.18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm install --production

# Copy the entire project files to the container (excluding the ones in .dockerignore)
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port where your Next.js application will run
EXPOSE 3000

# Set environment variables if needed
# ENV NODE_ENV production

# Define the command to start your Next.js application
CMD ["npm", "start"]
