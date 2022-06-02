# build command:
# docker build -t tovawr/dicystech-hub .
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install #--production
RUN npm audit fix
COPY . ./

ENV ENV="production"
EXPOSE 3000

CMD ["npm","start"]
