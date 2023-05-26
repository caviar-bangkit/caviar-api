FROM node:lts-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Run connect.sh
RUN chmod +x ./connect.sh
RUN ./connect.sh

# Check if .pem file exists
RUN ls -la

# Check if DATABASE_URL env variable exists
RUN echo $DATABASE_URL

# Copy local code to the container image.
COPY . ./

# Check if .pem file exists
RUN ls -la

# Generate the prisma client
RUN npx prisma generate

# Run the prisma migration
RUN npx prisma migrate dev --name init

# Run database seeding
RUN npm run seed

# Run the web service on container startup.
CMD [ "npm", "run", "start" ]