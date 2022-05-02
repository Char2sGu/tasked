# Tasked

A task management [PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) implemented with Angular and Nest.

## Features

- Responsive - All Devices: Desktop, Tablet and Phone
- Robust GraphQL API - Restricted Query Depth, Breadth, and Frequency
- Rich Transitions - Material Motion System
- Lazy Loading - Load Contents on Demand
- Dark Mode - Orthodox Material Dark Theme
- Bulk GraphQL Operations - Less HTTP Requests
- Well-organized State - Synced Locally based on Mutations
- Server CLI Commands - Easy Management

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

### Local Deployment

```sh
git clone https://github.com/TheNightmareX/tasked
cp .env.template .env
docker compose up
```

### Azure App Service Deployment

See `/.azure`.

### PWA Features and HTTPS

PWA features require a HTTPS context.

It's never a good practice to configure SSL stuff at the app scope. When deploying apps to the cloud, HTTPS usually automatically enabled, but when deploying locally, you'll need a outer server to enable HTTPS for the inner server running within docker.
