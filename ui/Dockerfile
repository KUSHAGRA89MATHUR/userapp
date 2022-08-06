# Pull the Node image from Docker Hub
FROM node:16.15.1-slim

# Setting Working Directory
WORKDIR /usr/app

ENV REACT_APP_ENVIRONMENT=production

# Copying only package.json
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy rest of the code to container
COPY . .

EXPOSE 3000

# Run the React app
CMD ["npm", "start"]



