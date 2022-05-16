FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . ./

ENV LDAP_CONTAINER_NAME=openldap
ENV LDAP_ADMIN_PASSWORD="HiHello"
ENV LDAP_URLS="localhost:389,localhost:636"
EXPOSE 3000

CMD ["npm","start"]
