FROM node:16-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . ./

# Run the prisma migration
RUN npx prisma migrate dev --name init

# Run database seeding
RUN npm run seed

# Run the web service on container startup.
CMD [ "npm", "run", "start" ]