FROM node:20.5.0
WORKDIR /app
COPY . .
RUN npm install
COPY  . .
EXPOSE 4001
CMD [ "npm" , "run" , "dev" ]