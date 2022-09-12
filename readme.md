# DICYSTECH

## How to run the system

## Production

The `docker-compose.yml` configures the creation and execution of the necessary containers for production. A `.env.prod` file is necessary, it must be created with all the necessary environment variables defined within (there's a `.env.example` to help).

If the images already exist but need to be updated:

```bash
docker container rm --force dicystech_client dicystech_hub
```

Then just run the `docker-compose.yml`. That can be `docker-compose up -d`, or `docker compose up -d`.

## Development / testing

All the environment variables (for every program) should be defined in a `.env.dev` file at the repo root.
