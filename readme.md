## How to run the system

The `docker-compose.yml` configures the creation and execution of the necessary containers. An `.env` file is necessary, it must be created with all the necessary environment variables defined within (there's a `.env.example` to help).

If the images already exist but need to be updated:

```bash
docker container rm --force dicystech_client dicystech_hub
```

Then just run the `docker-compose.yml`. That can be `docker-compose up -d`, or `docker compose up -d`.

