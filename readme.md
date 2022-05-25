## How to run the system

+ Build the OpenLDAP server image. It is built from the [`osixia/openldap:1.5.0`](https://hub.docker.com/r/osixia/openldap) image. This new image will bootstrap our system's schemas into the server.

```bash
docker build -t tovawr/openldap:withdata -f Dockerfile-openldap .
```


