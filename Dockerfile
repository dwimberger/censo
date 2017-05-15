FROM keymetrics/pm2-docker-alpine:4

# Expose ports
EXPOSE 3000

# Volume
VOLUME ["/var/data/"]

# Need stuff for fibers
RUN apk add --no-cache python make g++
RUN npm install -g node-gyp

# Create app directory
RUN mkdir -p /opt/censo

# Copy built bundle to app
COPY bundle /opt/censo
COPY process.yml /opt/censo

WORKDIR /opt/censo/programs/server
RUN npm install
WORKDIR /opt/censo

# Start the application
CMD ["pm2-docker", "start", "--auto-exit", "process.yml"]
