FROM node:lts-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Check if DATABASE_URL is set
RUN echo $DATABASE_URL

# Check if CLIENT_CERT is set
RUN echo $CLIENT_CERT

# Check if CLIENT_KEY is set
RUN echo $CLIENT_KEY

# Check if SERVER_CA is set
RUN echo $SERVER_CA

# Create .pem from env variables
RUN echo $CLIENT_CERT > client-cert.pem
RUN echo $CLIENT_KEY > client-key.pem
RUN echo $SERVER_CA > server-ca.pem

# Install openssl
RUN apt-get update && apt-get install -y openssl

# Run openssl command
RUN openssl pkcs12 -export -out client-identity.p12 -inkey client-key.pem -in client-cert.pem -password pass:090202

# Check if .pem file exists
RUN ls -la

# Copy local code to the container image.
COPY . ./

# Check the files in the container
RUN ls -la

# Generate the prisma client
RUN npx prisma generate

# Run the prisma migration
RUN npx prisma migrate dev --name init

# Run database seeding
RUN npm run seed

# Run the web service on container startup.
CMD [ "npm", "run", "start" ]