# Censo Inventory Web Application

A small inventory application for managing inventory.
Allows to identify items using QR codes.

This app is accompanied by a small bot application to request inventory items
using the QR code.

## Run the app locally

1. [Install Meteor][]
2. Checkout the code from GitHub
3. cd into the working copy directory
4. Use `meteor` to install the app's dependencies and run the app
5. Use the `build.sh` script to build a production version and a container with the
   version inside.

[Install Meteor]: https://www.meteor.com/install

## Docker

1. Build image `docker build -t dwimberger/censo .`
2. Run the image using  `docker run -e ... dwimberger/censo`

You will need to set environment variables to have this up and running
1. ROOT_URL and MAIL_URL for Meteor
2. Port to run on, use 3000; use Docker to bend it on the host
3. Mongo DB: `-e "MONGO_URL=mongodb://localhost:32769/censo"`
4. QR Service: `-e "QR_SERVICE_URL=http://localhost:32776/qr"`
5. Debug Logs: `-e "DEBUG=app,mongo"`
