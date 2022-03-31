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
git clone --recursive https://github.com/TheNightmareX/tasked
```

Docker is used for deployment only. For development, Node.js 15 or other compatible version of Node.js need to be installed.

For further instructions, see README of the submodules.

## Deployment

1. Get the resources:
   ```sh
   git clone --recursive https://github.com/TheNightmareX/tasked
   ```
1. Create and edit `.env` files to configure the application:
   ```sh
   cp tasked-backend/.env.template tasked-backend/.env
   ```
1. Optionally configure Docker Compose via a overriding file:
   ```sh
   touch docker-compose.override.yaml
   ```
1. Build and launch the application via Docker:
   ```sh
   docker compose up;
   ```

### Installing Dependencies behind a Proxy

Create `docker-compose.override.yaml`:

```yaml
services:
  backend:
    build:
      args:
        - HTTP_PROXY=http://host.docker.internal:10809
        - HTTPS_PROXY=http://host.docker.internal:10809
  frontend:
    build:
      args:
        - HTTP_PROXY=http://host.docker.internal:10809
        - HTTPS_PROXY=http://host.docker.internal:10809
```

### PWA(HTTPS)

PWA features require a HTTPS context.

It is always **recommended** to have a server running outside the container and configure a reverse proxy toward the server running inside the container. But when using HTTPS, this becomes **required** to do so, since it is not a good practice to configure SSL certificates in the App scope.
