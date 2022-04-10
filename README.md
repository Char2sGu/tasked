# Tasked

A todo management [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) implemented with Angular and Nest.

## Features

- Responsive Material UI - available for both desktops and mobiles
- Robust GraphQL API - restricted query depth, breadth, and frequency.
- Rich transitions - showed when loading
- Rooms - separate rooms for specific colleagues
- Roles - creators, managers and members have different permissions
- Lazy loading - smaller bundle size
- Multiple themes - a light one and a dark one, your preference by default
- Rich Notifications - showed after actions
- Bulk GraphQL operations - less HTTP requests
- Well-maintained state - synced locally based on mutations
- Internationalization - English and Chinese

## Main Tech Stack

- NestJS
- Angular
- TypeScript
- MikroORM
- RxJS
- GraphQL

## Screenshots

<details>

![Role: Member, Theme: Light, Device: Desktop](./res/desktop-light-member.jpg)
![Role: Member, Theme: Dark, Device: Desktop](./res/desktop-dark-member.jpg)
![Role: Member, Theme: Light, Device: Mobile](./res/mobile-light-member.jpg)
![Role: Member, Theme: Dark, Device: Mobile](./res/mobile-dark-member.jpg)

![Role: Manager, Theme: Light, Device: Desktop](./res/desktop-light-manager.jpg)
![Role: Manager, Theme: Dark, Device: Desktop](./res/desktop-dark-manager.jpg)
![Role: Manager, Theme: Light, Device: Mobile](./res/mobile-light-manager.jpg)
![Role: Manager, Theme: Dark, Device: Mobile](./res/mobile-dark-manager.jpg)

</details>

## Development

```sh
git clone https://github.com/TheNightmareX/tasked
npm i
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
   docker compose up;
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
