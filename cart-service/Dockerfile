FROM node:20.5.0
WORKDIR /app
COPY . .
RUN npm install
COPY . .
EXPOSE 4004
CMD [ "npm","run","dev" ]