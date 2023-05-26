FROM node:lts-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Echo some ssl certificates from the environment variables into a .pem file
RUN echo $CLIENT_CERT > client-cert.pem
RUN echo $CLIENT_KEY > client-key.pem
RUN echo $SERVER_CA > server-ca.pem

# Copy local code to the container image.
COPY . ./

# Generate the prisma client
RUN npx prisma generate

# Run the prisma migration
RUN npx prisma migrate dev --name init

# Run database seeding
RUN npm run seed

# Run the web service on container startup.
CMD [ "npm", "run", "start" ]