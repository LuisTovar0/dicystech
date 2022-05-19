# build command:
# docker build -t tovawr/dicystech-hub .
FROM node:16

WORKDIR /app

COPY package.json ./
RUN npm install
RUN npm audit fix
COPY . ./

ENV LDAP_ADMIN_PASSWORD="admin"
ENV LDAP_URLS="localhost:389"
EXPOSE 3000

CMD ["npm","start"]
