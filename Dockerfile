# Stage 1: Build
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Run
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy the build output from the build stage
COPY --from=build /app/.next ./.next

# Copy the public folder (images, static assets)
# COPY --from=build /app/public /public


# copy environment variables
COPY --from=build /app/.env ./.env
COPY .env .env

# Expose the port Next.js will run on
EXPOSE 3002

# Start the Next.js app in production mode
CMD ["npm", "start"]
