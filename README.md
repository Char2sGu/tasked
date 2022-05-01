# Tasked

A task management [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) implemented with Angular and Nest.

## Features

- Responsive - Desktop, Tablet and Phone
- Robust GraphQL API - Restricted Query Depth, Breadth, and Frequency
- Rich Transitions - Material Motion System
- Lazy loading - Load Contents on Demand
- Dark Mode - Orthodox Material Dark Theme
- Bulk GraphQL Operations - Less HTTP Requests
- Well-organized State - Synced Locally based on Mutations

## Main Tech Stack

- Angular
- NestJS
- TypeScript
- RxJS
- MikroORM
- GraphQL

## Development

```sh
git clone https://github.com/TheNightmareX/tasked
npm i
cp .env.template .env
npm run server:cli db:init
npm run server:cli db:seed
npm run dev
```

## Deployment

1. Get the resources:
   ```sh
   git clone https://github.com/TheNightmareX/tasked
   ```
1. Configure the application:
   ```sh
   cp .env.template .env
   ```
1. Launch the application:
   ```sh
   docker compose up
   ```

### Building the Image behind a Proxy

Before `docker compose up` or `docker compose build`, create `docker-compose.override.yaml`:

```yaml
services:
  client:
    build:
      args:
        - HTTP_PROXY=http://host.docker.internal:10809
        - HTTPS_PROXY=http://host.docker.internal:10809
  server:
    build:
      args:
        - HTTP_PROXY=http://host.docker.internal:10809
        - HTTPS_PROXY=http://host.docker.internal:10809
```

### PWA(HTTPS)

PWA features require a HTTPS context.

It is always **recommended** to have a server running outside the container and configure a reverse proxy toward the server running inside the container. But when using HTTPS, this becomes **required** to do so, since it is not a good practice to configure SSL certificates in the App scope.
