FROM node:alpine
WORKDIR /app
COPY backend/package*.json ./
RUN rm -rf node_modules
RUN npm install
COPY backend/. .
CMD ["npm", "run", "start-prod"]