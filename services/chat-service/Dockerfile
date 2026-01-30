FROM node:18

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose chat port
EXPOSE 4007

# Start service
CMD ["npm", "run", "start"]
