FROM node:lts-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Download Cloud SQL Auth proxy
RUN curl -o cloud-sql-proxy https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.3.0/cloud-sql-proxy.linux.amd64

# Make the Cloud SQL Auth proxy executable
RUN chmod +x cloud-sql-proxy

# Launch the Cloud SQL Auth proxy
CMD ./cloud-sql-proxy caviar-api-387910:asia-southeast2:caviardb --address 0.0.0.0 --port 3306

# Expose port 3306
EXPOSE 3306

# Copy local code to the container image.
COPY . ./

# Generate the prisma client
RUN npx prisma generate

# Run the prisma migration
RUN npx prisma migrate deploy

# Run database seeding
RUN npm run seed

# Run the web service on container startup.
CMD [ "npm", "run", "start" ]