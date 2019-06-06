FROM node:8
#WORKDIR /var/www/service
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
# RUN npm ci --only=production
COPY . .
CMD [ "npm", "run", "start" ]
