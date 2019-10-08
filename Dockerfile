FROM node:carbon-slim

# Create app directory
WORKDIR /phets-api

# Install app dependencies
COPY package.json /phets-api/
RUN npm install --no-cache

# Bundle app source
COPY . /phets-api/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
