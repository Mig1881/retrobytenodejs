FROM node:alpine
WORKDIR /app
COPY frontend/package*.json ./
RUN rm -rf node_modules
RUN npm install
COPY frontend/. .
CMD ["npm", "start"]