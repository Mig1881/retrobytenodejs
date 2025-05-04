FROM node:alpine
WORKDIR /app
COPY package*.json ./
RUN rm -rf node_modules
RUN npm install
COPY . .
CMD ["npm", "run", "start-prod"]