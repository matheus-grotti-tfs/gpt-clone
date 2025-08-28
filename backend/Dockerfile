# Use Node LTS
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package files first (better for caching)
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code
COPY ./src ./src

# Build TypeScript to JS
RUN npx tsc

# Expose API port
EXPOSE 4000

# Run app
CMD ["node", "dist/index.js"]
